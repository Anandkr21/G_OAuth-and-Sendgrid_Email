// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
require('dotenv').config()
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'anandkumargupta.akg15@gmail.com', // Change to your recipient
  from: 'anandkumargupta.526@gmail.com', // Change to your verified sender
  subject: 'Invoice from Digital bazar',
  text: 'Please visit agian',
  html: '<strong>You welcome</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })