# Cosine Similarity & Classification with Natural

-----

## Installing Node.js and Natural

This section contains a quick overview and installation instructions to get up and running with Node.js and it's Natural NLP package.


### Node.js

Node.js is a JavaScript runtime environment that utilizes Google's V8 JavaScript engine to execute JavaScript outside the browser.

Running JavaScript outside the browser with Node.js allows JavaScript to run on the server.

[More About Node.js]

[Install Node.js]

After installing Node.js, confirm that installation was successful by opening the terminal checking the current version. New downloads will output version 8 or 9, depending on your install.
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

[Natural] is one of the more popular natural language libraries for Node.js.

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


### Starting a Project With Natural

1. Create a new directory for your project, then navigate to project directory.
```
mkdir NaturalDemo
cd NaturalDemo
```
2. Create a package.json file. The package.json file is a config file to organize project dependencies.
```
npm init
```
This command will prompt for several project attributes. Complete the prompts or press enter to use default/blank values.
3. Install Natural and save it to the package.json file.
```
npm install --save natural
```
4. Import the natural library to your code by including it at the top of your js file.
```javascript
const natural = require('natural');
```

That's it! The Natural API is now available for use in your JavaScript project.

[Check Out Natural Documentation] to learn more about using Natural in your projects.


-----

### Coming Soon

Performing text classification with NPM's [Natural] package.

Data set includes 24,783 twitter tweets that are classified as hate speech, offensive, or neither. [Additional Info About Data] 

This project reduces the data set to two classes, offensive and non-offensive. If a raw data tweet is labelled as either hate speech or offensive speech, we label it as offensive. If raw data tweet is not labelled as hate speech of offensive speech, we label it as non-offensive. 

[Data Transformation] is required to convert the raw data to a 2 class data set.

-----

### Coming Soon

[Weka] was first used to prove offensive text classification concept, and to determine best pre-processing strategies.

[Natural] was then used to construct a classification model that can be run on the server, to be queried by users.

Naive Bayes and SVM models were created and tested using 10 fold cross validation. Cross validation results:

| Tool        | Classifier    | Accuracy |
| ----------- | ------------- |----------|
| Weka        | Naive Bayes   | 87.32 %  |
| Weka        | SVM           | 92.73 %  |
| NPM Natural | Naive Bayes   | TBD      |
| NPM Natural | SVM           | TBD      |




[Natural]: https://www.npmjs.com/package/natural
[More About Node.js]: https://nodejs.org/en/about/
[Install Node.js]: https://nodejs.org/en/
[About NPM]: https://www.npmjs.com/
[Check Out Natural Documentation]: https://github.com/NaturalNode/natural