const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

const document = "This is an example document, let's see it tokenized";

const tokenizedStemmedDocument = tokenizer
  .tokenize(document)
  .map(term => natural.PorterStemmer.stem(term));

console.log(tokenizedStemmedDocument);
