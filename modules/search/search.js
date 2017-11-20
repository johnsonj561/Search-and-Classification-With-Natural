const Collection = require('../collection/main.js');
const CosineSimilarity = require('../cosine-similarity/main.js').cosineSimilarity;
const CosineSimilarityMatrix = require('../cosine-similarity/main.js').cosineSimilarityMatrix;
const PlainText = require('../plain-text/main.js');

let collectionPath = '../collection/myCollection.json';
let collection = new Collection(collectionPath);
collection.loadFromFile()
  .then(resp => console.log('collection loaded from file complete'))
  .then(() => CosineSimilarityMatrix(collection))
  .then(() => indexURL(collection, 'http://www.tutorialspoint.com/python/'))
  .then(() => indexURL(collection, 'https://www.tutorialspoint.com/python/python_basic_syntax.htm'))
  .then(() => console.log('collection doc list length = ', collection.documentList.length))
  .then(() => CosineSimilarityMatrix(collection))
  .then(() => collection.removeDuplicates())
  .then(() => console.log('Duplicates removed'))
  .then(() => CosineSimilarityMatrix(collection))
  .then(() => collection.saveToFile())
  .catch(err => console.log('collection loaded from file error:', err));






function indexURL(collection, url) {
  return PlainText.getHTMLPlainText(url)
    .then(resp => collection.addDocument(url, resp));
}
