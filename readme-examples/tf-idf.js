var natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const tfidf = new natural.TfIdf();

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

// Output each documents tf-idf values
collection.forEach((doc, idx) => {
  console.log('\nDocument ' + idx);
  tfidf.listTerms(idx).forEach(item => {
    console.log(item.term + ': ' + item.tfidf.toFixed(3));
  });
})
