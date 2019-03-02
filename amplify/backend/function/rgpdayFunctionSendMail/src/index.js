const fetch = require('node-fetch')
const aws = require('aws-sdk')
const ses = new aws.SES({
  region: 'eu-west-1'
})

exports.handler = async function (event, context, callback) {
  // RECAPTCHA VERIFICATION
  const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || require('./secret_env.json').RECAPTCHA_SECRET
  if (!RECAPTCHA_SECRET) {
    callback(JSON.stringify({ success: false, message: 'RECAPTCHA_SECRET is missing' }))
  } else {
    const rawResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=${RECAPTCHA_SECRET}&response=${event.recaptcha}`
    })
    const verification = await rawResponse.json()

    if (verification.success &&
      verification.score > 0.5 &&
      verification.action === 'contact' &&
      (verification.hostname === 'localhost' || verification.hostname.indexOf('rgpday.com') !== -1)
    ) {
    // SEND EMAIL
      const eParams = {
        Destination: {
          ToAddresses: ['jeanphilippe.bourgeon@gmail.com']
        },
        Message: {
          Body: {
            Text: {
              Data: `Message de : ${event.sender}
  
  ---
  
  ${event.content}`
            }
          },
          Subject: {
            Data: `${event.subject}`
          }
        },
        Source: 'no-reply@rgpday.com'
      }

      ses.sendEmail(eParams, (err) => {
        if (err) {
          callback(JSON.stringify({ success: false, message: 'Email not sent', error: err }))
        } else {
          callback(null, JSON.stringify({ success: true, message: 'Email sent' }))
        }
      })
    } else {
      // RECAPTCHA verification failed
      callback(JSON.stringify({ success: false, message: 'Verification error', error: verification }))
    }
  }
}
