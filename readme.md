## Offensive Text Classification

-----

### Information Retrieval

Project 20 short stories into vector space model through various [Natural] utilities.
Respond to user queries with results determined through cosine similarity.

-----

### Text Classification

Performing text classification with NPM's [Natural] package.

Data set includes 24,783 twitter tweets that are classified as hate speech, offensive, or neither. [Additional Info About Data] 

This project reduces the data set to two classes, offensive and non-offensive. If a raw data tweet is labelled as either hate speech or offensive speech, we label it as offensive. If raw data tweet is not labelled as hate speech of offensive speech, we label it as non-offensive. 

[Data Transformation] is required to convert the raw data to a 2 class data set.

-----

### Text Classification Results

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
[Hate Speech and Offensive Language]: https://github.com/t-davidson/hate-speech-and-offensive-language
[Additional Info About Data]: data/readme.md
[Data Transformation]: data_processing/parse_raw_data.js
[Weka]: https://www.cs.waikato.ac.nz/ml/weka/