const accountSid   = process.env.TWILIO_ACCOUNT_SID_TEST;
const authToken    = process.env.TWILIO_AUTH_TOKEN_TEST;
const twilioClient = require('twilio')(accountSid, authToken);

const sendSMS = (message, receiverMobile) => {

  twilioClient.messages
    .create({
      body: message,
      from: `+1${process.env.OWNER_NUMBER}`,
      to: `+1${receiverMobile}`
    })
    .then(message => console.log(message))
    .catch((err) => console.log(err));
};

module.exports = {
  sendSMS
}