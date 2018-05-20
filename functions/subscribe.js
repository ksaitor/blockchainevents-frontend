const functions = require('firebase-functions');
const admin = require('firebase-admin');

const request = require('request-promise');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const NodeGeocoder = require('node-geocoder');
const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: functions.config().google.apikey
});

module.exports = functions.https.onRequest((req, res) => {
  const clientIp = requestIp.getClientIp(req);

  const subscriberSample = {
    email: '',
    formattedCity: 'Seoul, South Korea',
    name: '',
    timezone: 'Asia/Singapore'
  }

  return res.status(200).send('nice');
})
