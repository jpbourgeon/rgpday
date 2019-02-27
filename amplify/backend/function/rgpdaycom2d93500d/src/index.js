var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'eu-west-1'
});

// exports.handler = function (event, context) { //eslint-disable-line
//   console.log(`value1 = ${event.key1}`);
//   console.log(`value2 = ${event.key2}`);
//   console.log(`value3 = ${event.key3}`);
//   context.done(null, 'Hello World'); // SUCCESS with message
// };

exports.handler = function(event, context) {
  console.log("Incoming: ", event);

  var eParams = {
      Destination: {
          ToAddresses: [`${event.SESVerifiedEmail}`]
      },
      Message: {
          Body: {
              Text: {
                  Data: `Message de : ${event.from}
                  
                  --- 

                  ${event.content}`
              }
          },
          Subject: {
              Data: `${event.subject}`
          }
      },
      Source: `${event.SESVerifiedEmail}`
  };

  console.log("eParams: ", eParams);

  console.log('===SENDING EMAIL===');
  var email = ses.sendEmail(eParams, function(err, data){
      if(err) console.log(err);
      else {
          console.log("===EMAIL SENT===");
          console.log(data);


          console.log("EMAIL CODE END");
          console.log('EMAIL: ', email);
          context.succeed(event);

      }
  });

};