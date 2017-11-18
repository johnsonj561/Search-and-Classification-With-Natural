/*
 * Import dependencies
 */
const fse = require('fs-extra');
const natural = require('natural');
const bayesClassifier = new natural.BayesClassifier(natural.PorterStemmer, true);
const tokenizer = new natural.WordTokenizer();

// Note - Naive Bayes Classifier uses Porter Stemmer by default.
// Raw data is already stemmed, consider using unstemmed raw data.


/*
 * Define training data and file to write classification model to
 */
const trainingData = '../data/webkb-train-stemmed.txt';
const trainedClassifierPath = '../classifiers/naiveBayesClassifier.json';

/*
 * Initialize read stream and define error handler
 * Streams read data in chunks, allowing us to work on chunks of data at a time, reducing memory overhead
 */
const readStream = fse.createReadStream(trainingData, 'utf-8')
  .on('error', err => console.log('readStream error: ', err));


/**
 * Keep count of total trained documents and class frequency
 */
let trainedDocs = 0;
let classFrequency = {
  'student': 0,
  'faculty': 0,
  'course': 0,
  'project': 0
}

/**
 * For each data chunk
 * Parse data into a format readible by the classifier
 * Classifier receives documents as text label pairs
 * Raw data contains label \t text, where each document is separated by new line
 */
console.log('\nParsing data into (text,label) pairs and adding to classifier');
let startTime = Date.now();
readStream.on('data', data => {
  // split data into documents by splitting on new line
  data = data.split('\n');
  // for each document (line), split on tab to separate label from doc text
  // add each text label pair to the classifier
  data.forEach(doc => {
    doc = doc.trim().split('\t');
    const label = doc[0];
    const text = doc[1];
    // confirm that we have a valid pair, then add to classifier
    if (text && label) {
      bayesClassifier.addDocument(text, label.trim());
      trainedDocs++;
      classFrequency[label.trim()]++;
    }
  });
});


/**
 * Define classification training listener that fires after each doc is trained
 * Being used to provide feedback on training progress
 */
bayesClassifier.events.on('trainedWithDocument', function (obj) {
  const totalDocs = obj.total;
  const idx = obj.index;
  if (idx % 250 === 0) {
    const percentage = ((idx / totalDocs) * 100).toFixed(2);
    console.log('Training is ' + percentage + ' % complete');
  }
});


/**
 * Once read stream has consumed all data, output results and begin training
 */
readStream.on('end', () => {
  const parseTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n${trainedDocs} documents have been added to the classifier in ${parseTime} seconds`);
  console.log('\nClass Frequencies:\n', JSON.stringify(classFrequency, null, 2));
  trainClassifier();
});


/**
 * Train Naive Bayes Classifier
 * Log Training Time
 */
function trainClassifier() {
  console.log('\nBeginning training now...');
  // begin training
  startTime = Date.now();
  bayesClassifier.train();
  // calculate training time (ms)
  const trainingTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log('\nNaive Bayes classifier training completed in ' + trainingTime + ' seconds');
  saveClassifier();
}


/**
 * Save Classifier to JSON file
 */
function saveClassifier() {
  bayesClassifier.save(trainedClassifierPath, err => {
    if (err) console.log('\nError saving classifier: ', err);
    else console.log('\nClassifier saved to ' + trainedClassifierPath);
  });
}
