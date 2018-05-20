const functions = require('firebase-functions');

const request = require('request-promise');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const NodeGeocoder = require('node-geocoder');
const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: functions.config().google.apikey
});
const cors = require('cors')({ origin: true });

module.exports = functions.https.onRequest((req, res) => {
  const clientIp = requestIp.getClientIp(req);
  return request(`http://ip-api.com/json/${clientIp}`)
  .then((data) => {
    const geo1 = JSON.parse(data)
    const geo2 = geoip.lookup(clientIp)
    return cors(req, res, () => {
      return res.status(200).send({clientIp, geo1, geo2})
    });
  })
})
