var express = require('express');
var router = express.Router();
var fetchUrl = require("fetch").fetchUrl;
var h2p = require('html2plaintext')
var fse = require('fs-extra');
var natural = require('natural');
var PlainText = require('../modules/plain-text/main');
const Collection = require('../modules/collection/main');
const CosineSimilarity = require('../modules/cosine-similarity/main');
const getCosineSimilarity = CosineSimilarity.cosineSimilarity;
const calcQueryTfIdf = require('../modules/query/main');


/**
 * Load Naive Bayes Classifier
 */
const nbClassifierPath = './classification/classifiers/naiveBayesClassifier.json';
let nbClassifier;
natural.BayesClassifier.load(nbClassifierPath, null, function (err, classifier) {
  if (err) console.log('\nError reading classifier');
  else {
    nbClassifier = classifier;
    console.log('\nNaive Bayes Classifier loaded.');
  };
});


/**
 * Load Searchable Collection
 */
const collectionFile = './modules/collection/myCollection.json';
console.log(fse.pathExistsSync(collectionFile));
const collection = new Collection(collectionFile);
collection.loadFromFile()
  .then(resp => console.log('Classifier loaded from ' + collectionFile))
  .catch(err => console.log('Error loading collection from ' + collectionFile + ': ', err));


/**
 * Classify the document found at url
 * Uses Naive Bayes classifier trained on 4 Universities Data Set
 */
router.post('/classify', function (req, res, next) {
  const url = req.body.url;
  console.log('\n/classify hit');
  // if our classifier is available
  if (nbClassifier) {
    htmlPlainText = PlainText.getHTMLPlainText(url)
      .then(plainText => {
        console.log(plainText);
        const result = nbClassifier.classify(plainText);
        res.json({
          success: true,
          message: 'Classification Complete',
          result: result
        });
      });
  } else {
    res.json({
      message: 'Classifier Unavailable'
    });
  }
});


/**
 * Add new document to index
 * Document is plain text found at url
 */
router.post('/document', function (req, res, next) {
  console.log('\n/document hit');
  const url = req.body.url;
  console.log('\nindex: url = ' + url);
  PlainText.getHTMLPlainText(url)
    .then(resp => collection.addDocument(url, resp))
    .then(() => console.log('Document added to index'))
    .then(() => collection.saveToFile())
    .then(() => console.log('Collection written to file ' + collection.path))
    .then(() => {
      res.json({
        success: true,
        message: 'New document added to index',
        url: url
      });
    }).catch(err => {
      res.json({
        success: false,
        message: 'Unable to add document to index',
        error: err
      });
    });
});


/**
 * Search collection for query phrase
 * Calculate tf-idf for all query-doc pairs and return top 5 results
 */
router.post('/search', function (req, res, next) {
  let query = req.body.query;
  // if no collection loaded return error
  if (!collection) {
    res.json({
      success: false,
      message: 'No collection available for search'
    });
  }

  // get query tfidf
  query = calcQueryTfIdf(query);

  // for each document, calculate cosine similarity
  let results = [];
  collection.documentList.forEach((doc, idx) => {
    const cs = getCosineSimilarity(query, collection.tfidf.listTerms(idx));
    results.push({
      url: doc.url,
      tfidf: cs
    });
  });

  // sort array by tfidf descending
  results.sort(function (a, b) {
    return (a.tfidf < b.tfidf) ? 1 : -1;
  })

  res.json({
    success: true,
    data: results.slice(0, 5)
  });
})

module.exports = router;
