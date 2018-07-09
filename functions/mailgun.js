const functions = require('firebase-functions');
const mailgun = require('mailgun-js')({
  apiKey: functions.config().mailgun.key,
  domain: functions.config().mailgun.domain
})
const Slugify = require('slugify')

exports.subscribeToList = ({email, city}) => {
  const cityList = Slugify(city) + '@blockchainevent.co'
  mailgun
    .lists(cityList)
    .members()
    .create({
      address: email,
      subscribed: true
    }, (err, data) => {
      console.log(err, data)
    })
}
