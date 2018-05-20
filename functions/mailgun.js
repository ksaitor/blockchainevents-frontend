const functions = require('firebase-functions');
const mailgun = require('mailgun-js')({
  apiKey: functions.config().mailgun.key,
  domain: functions.config().mailgun.domain
})


exports.subscribeToList = ({email, city}) => {

}
