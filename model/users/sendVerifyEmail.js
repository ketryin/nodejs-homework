const sendGridClient = require('@sendgrid/mail')
require('dotenv').config()

const { EMAIL_VERIFICATION_BASE_URL, FROM_EMAIL } = process.env

const subject = 'Verify User'
const text = 'In order to complete registration, please verify you user'

const generateHtml = verifyToken =>
`<div>
  <strong>Verify your email by clicking the link below.</strong>
  <a href="${EMAIL_VERIFICATION_BASE_URL}/api/users/verify/${verifyToken}">Click me.</a>
<div>`

async function sendVerifyEmail(toEmail, verifyToken) {
  const message = {
    to: toEmail,
    from: FROM_EMAIL,
    subject: subject,
    text: text,
    html: generateHtml(verifyToken),
  }

  await sendGridClient.send(message)
}

module.exports = sendVerifyEmail
