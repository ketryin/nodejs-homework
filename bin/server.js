const app = require('../app')
const mongoose = require('mongoose')
const sendGridClient = require('@sendgrid/mail')

require('dotenv').config()

const { CONNECTION_STRING, PORT = 3000, SEND_GRID_API_KEY } = process.env

mongoose
  .connect(CONNECTION_STRING, { useUnifiedTopology: true })
  .then(async () => console.log('Database connection successful'))
  .then(() => sendGridClient.setApiKey(SEND_GRID_API_KEY))
  .then(() => console.log('SendGrid api key set successfully'))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err.message)
    process.exit(1)
  })
