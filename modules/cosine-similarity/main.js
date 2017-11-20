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
    tfidf1 = Number(d1[key]);
    tfidf2 = Number(d2[key]) || 0;
    sum += tfidf1 * tfidf2;
  });
  // divide dot product by normalization factors
  const norm1 = calcNormalizationFactor(d1);
  const norm2 = calcNormalizationFactor(d2);
  return sum / (norm1 * norm2);
}


function cosineSimilarityMatrix(collection) {
  if (!collection) return;
  let header = '';
  let body = '';
  collection.documentList.forEach((docRow, row) => {
    header += '\tDoc' + (row + 1);
    body += 'Doc ' + (row + 1) + ':';
    collection.documentList.forEach((docCol, col) => {
      body += '\t' + cosineSimilarity(collection.tfidf.listTerms(row), collection.tfidf.listTerms(col)).toFixed(2);
    })
    body += '\n';
  });
  console.log(header + '\n' + body);
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


module.exports = {
  cosineSimilarity,
  cosineSimilarityMatrix
}
