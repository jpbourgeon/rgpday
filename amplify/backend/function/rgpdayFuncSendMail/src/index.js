const aws = require('aws-sdk')
const lambda = new aws.Lambda({ region: 'eu-west-1' })
const ses = new aws.SES({ region: 'eu-west-1' })

exports.handler = function (event, context, callback) {
  const params = {
    FunctionName: `rgpdayFuncVerifyRecaptcha-${process.env.ENV || 'dev'}`,
    Payload: JSON.stringify({ request: { validationData: { recaptcha: event.recaptcha } } }),
    InvocationType: 'RequestResponse'
  }
  lambda.invoke(params, (error, data) => {
    if (error) {
      callback(new Error(JSON.stringify(error)), event)
    } else {
      const payload = JSON.parse(data.Payload)
      if (typeof payload.errorMessage !== 'undefined') {
        callback(new Error(JSON.stringify(payload)), event)
      } else {
        const Data =
// START MESSAGE TEMPLATE
`Message de : ${event.sender}

---

${event.content}`
// END MESSAGE TEMPLATE
        const eParams = {
          Destination: {
            ToAddresses: ['jeanphilippe.bourgeon@gmail.com']
          },
          Message: {
            Body: {
              Text: {
                Data
              }
            },
            Subject: {
              Data: `${event.subject}`
            }
          },
          Source: 'no-reply@rgpday.com'
        }
        // SEND EMAIL
        ses.sendEmail(eParams, (error, data) => {
          if (error) {
            callback(new Error(JSON.stringify(error)), event)
          } else {
            callback(null, event)
          }
        })
      }
    }
  })
}
