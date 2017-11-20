var natural = require('natural');
var TfIdf = natural.TfIdf;
const PlainText = require('../plain-text/main');
const fse = require('fs-extra');

function Collection(path) {
  console.log('Collection created');
  this.path = path;
  this.documentList = [];
  this.tfidf = new TfIdf();
}

Collection.prototype.addDocument = function (url, text) {
  this.documentList.push({
    url,
    text
  });
  this.tfidf.addDocument(text);
}

Collection.prototype.removeDuplicates = function () {
  let unique = {};
  this.documentList.forEach(doc => {
    if (!unique[doc.url]) {
      unique[doc.url] = doc.text;
    }
  });
  this.documentList = [];
  this.tfidf = new TfIdf();
  Object.keys(unique).forEach(key => {
    this.addDocument(key, unique[key]);
  });
}


Collection.prototype.printDocuments = function () {
  this.documentList.forEach(doc => console.log(doc));
}

Collection.prototype.loadFromFile = function () {
  return new Promise((resolve, reject) => {
    fse.readJson(this.path)
      .then(resp => {
        this.documentList = resp.documentList;
        this.tfidf = new TfIdf();
        this.documentList.forEach(doc => this.tfidf.addDocument(doc.text));
        resolve(this);
      }).catch(err => reject('Unable to load json from ' + this.path + ': ' + err));
  });
}

Collection.prototype.saveToFile = function () {
  return new Promise((resolve, reject) => {
    fse.writeJSON(this.path, {
      'documentList': this.documentList
    }).then(resp => {
      console.log('Collection written to file: ' + this.path);
      resolve()
    }).catch(err => {
      console.log('Error writing to file: ' + this.path, err);
      reject(err);
    });
  });
}


Collection.prototype.initCollection = function () {
  const initUrls = [
  'https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more',
  'https://scotch.io/tutorials/retrogames-library-with-node-react-and-redux-1-server-api-and-react-frontend?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more',
  'https://blog.risingstack.com/node-js-interview-questions-and-answers-2017/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more',
  'https://blog.thoughtram.io/angular/2015/07/07/service-vs-factory-once-and-for-all.html',
  'https://www.w3schools.com/html/html_intro.asp',
  'https://www.w3schools.com/html/html_basic.asp',
  'https://github.com/AllThingsSmitty/css-protips?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more',
  'https://medium.freecodecamp.org/css-flexbox-explained-by-road-tripping-across-the-country-1217b69c390e?utm_source=mybridge&gi=90f20f50e484'
  ];

  // create a collection and add urls to collection
  let promises = [];
  initUrls.forEach((url) => {
    promises.push(PlainText.getHTMLPlainText(url));
  });

  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then(resp => {
        resp.forEach((doc, idx) => {
          this.addDocument(initUrls[idx], doc);
        });
        return this;
      })
      .then(collection => collection.saveToFile())
      .then(() => resolve(this))
      .catch(err => reject('Unable to initialize collection' + err));
  });
}




module.exports = Collection;
