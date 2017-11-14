var fetchUrl = require("fetch").fetchUrl;
var h2p = require('html2plaintext')
var fse = require('fs-extra');
var natural = require('natural');

const trainedClassifierPath = '../classifiers/naiveBayesClassifier.json';

const url = 'http://rafaelderolez.be/';

// source file is iso-8859-15 but it is converted to utf-8 automatically
fetchUrl(url, function (error, meta, body) {
  console.log(body.toString());
  console.log('\n\n');
  let plainText = h2p(body.toString());
  plainText = plainText.replace(/\s{2,}/mg, ' ');
  plainText = plainText.replace(/\n/g, ' ');
  console.log(plainText);

  classify(plainText);

});


function classify(text) {
  natural.BayesClassifier.load(trainedClassifierPath, null, function (err, classifier) {
    if (err) console.log('\nError reading classifier');
    else console.log('\nRESULT: ' + classifier.classify(text) + '\n\n');
  });
}
