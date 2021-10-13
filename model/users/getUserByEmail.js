const usersCollection = require('./usersCollection')

async function getUserByEmail(email) {
  return await usersCollection.findOne({ email })
}

module.exports = getUserByEmail
