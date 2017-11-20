const fetchUrl = require("fetch").fetchUrl;
const h2p = require('html2plaintext');

/**
 * Get url's plain text
 * @return Promise containing plain text found at url
 */
function getHTMLPlainText(url) {
  return new Promise((resolve, reject) => {
    fetchUrl(url, function (error, meta, body) {
      if (error) reject('Error getting html plain text:', error);
      else {
        let plainText = h2p(body.toString());
        plainText = plainText.replace(/\s{2,}/mg, ' ');
        plainText = plainText.replace(/\n/g, ' ');
        resolve(plainText);
      }
    });
  })
};

module.exports = {
  getHTMLPlainText
}
