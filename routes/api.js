var express = require('express');
var router = express.Router();
var fetchUrl = require("fetch").fetchUrl;
var h2p = require('html2plaintext')
var fse = require('fs-extra');
var natural = require('natural');

// load and cache naive bayes classifier
const nbClassifierPath = './classification/classifiers/naiveBayesClassifier.json';
let nbClassifier;

natural.BayesClassifier.load(nbClassifierPath, null, function (err, classifier) {
  if (err) console.log('\nError reading classifier');
  else {
    nbClassifier = classifier;
    console.log('\nNaive Bayes Classifier loaded.');
  };
  // console.log(arguments);
});



router.get('/', function (req, res, next) {
  res.json({
    message: "Hello World"
  })
});

router.post('/classify', function (req, res, next) {
  const url = req.body.url;
  // if our classifier is available
  if (nbClassifier) {
    htmlPlainText = getHTMLPlainText(url, function (plainText) {
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


function getHTMLPlainText(url, cb) {
  fetchUrl(url, function (error, meta, body) {
    let plainText = h2p(body.toString());
    plainText = plainText.replace(/\s{2,}/mg, ' ');
    plainText = plainText.replace(/\n/g, ' ');
    cb(plainText);
  });
}

module.exports = router;
