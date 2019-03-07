const request = require('sync-request')

exports.handler = function (event, context, callback) {
  const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || require('./secret_env.json').RECAPTCHA_SECRET
  if (!RECAPTCHA_SECRET || RECAPTCHA_SECRET === '') {
    callback(new Error('The RECAPTCHA_SECRET is missing'), event)
  } else {
    const res = request('POST', 'https://www.google.com/recaptcha/api/siteverify', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=${RECAPTCHA_SECRET}&response=${event.request.validationData.recaptcha}`,
      timeout: 4000
    })
    const verification = JSON.parse(res.getBody().toString())
    if (
      verification.success &&
      verification.score > 0.5 &&
      verification.action === 'contact' &&
      (
        verification.hostname === 'localhost' ||
        verification.hostname.indexOf('rgpday.com') !== -1 ||
        verification.hostname.indexOf('amplifyapp.com') !== -1
      )
    ) {
      callback(null, event)
    } else {
      // RECAPTCHA verification failed
      callback(new Error(JSON.stringify(verification)), event)
    }
  }
}
