var natural = require('natural');
var TfIdf = natural.TfIdf;
const PlainText = require('../plain-text/main');
const fse = require('fs-extra');

function calcTfIdf(query) {
  let tfidf = new TfIdf();
  tfidf.addDocument(query);
  return tfidf.listTerms(0);
}

module.exports = calcTfIdf;
