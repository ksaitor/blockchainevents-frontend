const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const moment = require('moment');

module.exports = functions.https.onRequest((req, res) => {
  const params = Object.assign({}, req.query, req.body);
  params.approved = false;
  params.when = new Date(params.when);
  params._city = params.city;
  params.city = params.city.toUpperCase().trim();
  const newEventRef = admin.firestore().collection('events').doc();
  return newEventRef.set(params).then((snapshot)=>{
    return res.status(200).send(snapshot.ref.toString());
  })
})
