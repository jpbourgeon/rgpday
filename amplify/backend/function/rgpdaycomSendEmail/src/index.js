var aws = require('aws-sdk')
var ses = new aws.SES({
  region: 'eu-west-1'
})

exports.handler = function (event, context) {
  console.log('Incoming: ', context)

  console.log('Incoming: ', event)

  var eParams = {
    Destination: {
      ToAddresses: [`${event.to}`]
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
    Source: `${event.from}`
  }

  console.log('eParams: ', eParams)

  console.log('===SENDING EMAIL===')
  var email = ses.sendEmail(eParams, function (err, data) {
    if (err) console.log(err)
    else {
      console.log('===EMAIL SENT===')
      console.log(data)

      console.log('EMAIL CODE END')
      console.log('EMAIL: ', email)
      context.succeed(event)
    }
  })
}
