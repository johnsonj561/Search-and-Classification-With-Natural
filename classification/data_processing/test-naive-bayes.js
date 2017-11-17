/*
 * Import dependencies
 */
const fse = require('fs-extra');
const natural = require('natural');

/*
 * Define test data and file to write classification model to
 */
const testData = '../data/webkb-test-stemmed.txt';
const trainedClassifierPath = '../classifiers/naiveBayesClassifier.json';


/**
 * Load Naive Bayes Classifier from JSON file
 */
natural.BayesClassifier.load(trainedClassifierPath, null, function (err, classifier) {
  if (err) console.log('\nError reading classifier');
  else processTestData(classifier);
});

/**
 * Keep count of total trained documents and class frequency
 */
let testedDocs = 0;
let labels = ['student', 'faculty', 'course', 'project'];
let classResults = {};
labels.forEach(label => classResults[label] = {
  'correct': 0,
  'incorrect': 0
});


/**
 * Process Test Data
 * Split test data by line to separate documents
 * Split each document on \t to separate label from doc text
 * classify the text, compre result to known label, then record results
 */
function processTestData(nbClassifier) {
  console.log('\nBeginning classifier testing...\n');
  let startTime = Date.now();
  // begin reading test data
  const readStream = fse.createReadStream(testData, 'utf-8')
    .on('error', err => console.log('readStream error: ', err))
    .on('data', data => {
      // split data into documents by splitting on new line
      data = data.split('\n');
      // add each text label pair to the classifier
      data.forEach(doc => {
        doc = doc.trim().split('\t');
        const label = doc[0];
        const text = doc[1];
        // confirm that we have a valid pair, then classify
        // compare classification result to known label and update classResults
        if (text && label) {
          testedDocs++;
          const l = nbClassifier.classify(text)
          const result = (label === l) ? 'correct' : 'incorrect';
          classResults[label][result]++;
        }
      });
      console.log((testedDocs + ' documents tested'));
    })
    .on('end', () => {
      const parseTime = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`Testing of ${testedDocs} documents completed in ${parseTime} seconds`);
      printResults();
    });
}

function printResults() {
  let accuracySum = 0;
  labels.forEach(label => {
    let correct = classResults[label].correct;
    let incorrect = classResults[label].incorrect;
    let accuracy = (correct / (correct + incorrect)) * 100;
    accuracySum += accuracy;
    classResults[label].accuracy = accuracy.toFixed() + ' %';
  });
  const averageAccuracy = accuracySum / labels.length;
  console.log('\nClass Results:\n', JSON.stringify(classResults, null, 2));
  console.log('\nAverage Accuracy:\t' + averageAccuracy + '\n');
}
