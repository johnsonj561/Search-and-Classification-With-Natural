/*
 * Calculating Cosine Similarity between two documents
 * Documents are expected to be an array of objects
 * Where each object contains 'term' and 'tfidf' key value pairs
 * Ex document:
 * [ { term: 'ar', tfidf: 1.6931471805599454 },
 * { term: 'popular', tfidf: 1.6931471805599454 },
 * { term: 'pet', tfidf: 1.6931471805599454 },
 * { term: 'cat', tfidf: 1.2876820724517808 }]
 */
function cosineSimilarity(doc1, doc2) {
  // start with the smaller document to reduce total computation time
  let d1 = (doc1.length <= doc2.length) ? doc1 : doc2;
  let d2 = (doc1.length <= doc2.length) ? doc2 : doc1;
  // reduce each document to key value pair objects in the form term: tfidf
  d1 = reduceDocument(d1);
  d2 = reduceDocument(d2);
  // calculate dot product
  let sum = 0;
  Object.keys(d1).forEach(key => {
    tfidf1 = d1[key];
    tfidf2 = d2[key] || 0;
    sum += tfidf1 * tfidf2;
  });
  // divide dot product by normalization factors
  const norm1 = calcNormalizationFactor(d1);
  const norm2 = calcNormalizationFactor(d2);
  return sum / (norm1 * norm2);
}


function reduceDocument(doc) {
  return doc.reduce((reducedDoc, term) => {
    reducedDoc[term.term] = term.tfidf;
    return reducedDoc;
  }, {});
}


function calcNormalizationFactor(doc) {
  let squaredSum = 0;
  Object.keys(doc).forEach(key => squaredSum += (doc[key] * doc[key]));
  return Math.sqrt(squaredSum);
}


module.exports = cosineSimilarity;
