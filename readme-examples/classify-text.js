const natural = require('natural');
const nbClassifier = new natural.BayesClassifier();

nbClassifier.addDocument('this product was great, I\'m so happy', 'positive');
nbClassifier.addDocument('I was dissapointed with this poor product', 'negative');
nbClassifier.addDocument('This was bad purchase, poor customer service and overall disatisfied', 'negative');
nbClassifier.addDocument('Excellent service, very satisified with good quality', 'positive');

nbClassifier.train();

let test1 = 'I am happy with this product';
let classification1 = nbClassifier.classify(test1);
console.log('\nTest 1: ' + test1);
console.log('Result: ' + classification1);

let test2 = 'I am disatisfied with purchase';
let classification2 = nbClassifier.classify(test2);
console.log('\nTest 2: ' + test2);
console.log('Result: ' + classification2);
