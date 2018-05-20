const functions = require('firebase-functions');
const admin = require('firebase-admin');

module.exports = functions.https.onRequest((req, res) => {
  const query = Object.assign({}, req.query, req.body);

  return res.status(200).send('ok');
})
