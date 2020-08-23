const accountSid   = process.env.TWILIO_ACCOUNT_SID_TEST;
const authToken    = process.env.TWILIO_AUTH_TOKEN_TEST;
const twilioClient = require('twilio')(accountSid, authToken);



const sendSMS = () => {
  const message = `
  Hi Jeff. Your order has been received.
  Order#: 123456
  
  Do not reply.`

  twilioClient.messages
    .create({
      body: message,
      from: '+16122554181',  // this is a trial number (sends a default message)
      to: '+14168236970'  // change this to the receiver's number
    })
    .then(message => console.log(message))
    .catch((err) => console.log(err));
};