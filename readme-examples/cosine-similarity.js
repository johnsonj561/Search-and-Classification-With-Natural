const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const tfidf = new natural.TfIdf();
const CosineSimilarity = require('../modules/cosine-similarity/main');
const calcCosineSimilarity = CosineSimilarity.cosineSimilarity;

const document1 = "cats and dogs are popular pets";
const document2 = "cats like to sleep and eat a lot";
const document3 = "dogs like to play outside and be with other dogs"
const document4 = "fish swim in circles and blow bubbles";

const collection = [document1, document2, document3, document4];

const tokenizedStemmedDocuments = [];

// Push tokenized/stemmed docs onto new array
collection.forEach(doc => {
  tokenizedStemmedDocuments.push(
    tokenizer.tokenize(doc)
    .map(term => natural.PorterStemmer.stem(term)));
});

// Add each tokenized/stemmed doc to tfidf object
tokenizedStemmedDocuments.forEach(doc => tfidf.addDocument(doc));

// Compute cosine similarity for all document pairs
// Output cosine similarity matrix
console.log('\tDoc1\tDoc2\tDoc3\tDoc4');
collection.forEach((docRow, row) => {
  let s = '\Doc ' + (row + 1) + ':';
  collection.forEach((docCol, col) => {
    s += '\t' + calcCosineSimilarity(tfidf.listTerms(row), tfidf.listTerms(col)).toFixed(2);
  });
  console.log(s)
});
