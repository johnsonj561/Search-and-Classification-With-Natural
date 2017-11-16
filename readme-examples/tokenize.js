const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

const document = "This is an example document, let's see it tokenized";

const tokenizedDocument = tokenizer.tokenize(document);

console.log(tokenizedDocument);
