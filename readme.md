# Cosine Similarity & Classification with Natural


-----


## Overview

#### [Installation](#installing-node-and-natural)

#### [TF-IDF Calculation](#tf-idf-calculation)

#### [Cosine Similarity Calculation](#cosine-similarity)

#### [Text Classification](#naive-bayes-classification)


-----


## Installing Node and Natural

This section contains a quick overview and installation instructions to get up and running with Node.js and NLP package Natural.


### Node.js

Node.js is a JavaScript runtime environment that utilizes Google's V8 JavaScript engine to execute JavaScript outside the browser.

Running JavaScript outside the browser with Node.js allows JavaScript to run on the server.

[More About Node.js]

[Install Node.js]

After installing Node.js, confirm that installation was successful by opening the terminal checking the current version. Version 9 was just released in October.
```
$ node -v
v9.1.0  
```


### NPM

The Node Package Manager (NPM) is installed with Node.js as the default package manager for Node.js. Alternative package managers are available for download.

Confirm that NPM is available by opening the terminal and checking the current version.
```
$ npm -v
5.5.1
```

[More About NPM]


### Natural Package

[Natural] is one of the more popular natural language libraries for Node.js. It's receiving approximately 50,000 downloads per week at the time of this documentation.

Some utilities provided by Natural include:
- tokenizing
- stemming
- string distance
- tf-idf
- classification
- WordNet integration
- spell checking
- inflectors
- n-grams

Natural can be easily added to your project through use of NPM, as described in the next section.

Natural strives to provide a one stop NLP resource, similar to NLTK for Python. They need contributors! If you are interested in NLP and JavaScript/Node.js, then this appears to be great opportunity to contribute to open source NLP.


### Starting a Project With Natural

1. Create a new directory for your project, then navigate to project directory.
```
$ mkdir NaturalDemo
$ cd NaturalDemo
```
2. Create a package.json file. The package.json file is a config file to organize project dependencies.
```
$ npm init
```
This command will prompt for several project attributes. Complete the prompts or press enter to use default/blank values.
3. Install Natural and save it to the package.json file.
```
$ npm install --save natural
```
4. Import the natural library to your code by including it at the top of your js file.
```javascript
const natural = require('natural');
```

That's it! The Natural API is now available for use in your JavaScript project.

[Check Out Natural Documentation] to learn more about using Natural in your projects.


-----


## TF-IDF

This section walks through the construction of a word-doc tf-idf matrix given a collection of documents.

### Tokenizing

### Stop Words

### Stemming

### TF-IDF Calculation


-----


## Cosine Similarity

This section covers the cosine similarity calculation.


-----


## Naive Bayes Classification


Naive Bayes classification, comparison with Weka results

| Tool        | Classifier    | Accuracy |
| ----------- | ------------- |----------|
| Weka        | Naive Bayes   | 87.32 %  |
| Weka        | SVM           | 92.73 %  |
| NPM Natural | Naive Bayes   | TBD      |
| NPM Natural | SVM           | TBD      |


-----


[Natural]: https://www.npmjs.com/package/natural
[More About Node.js]: https://nodejs.org/en/about/
[Install Node.js]: https://nodejs.org/en/
[More About NPM]: https://www.npmjs.com/
[Check Out Natural Documentation]: https://github.com/NaturalNode/natural