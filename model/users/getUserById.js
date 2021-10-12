const usersCollection = require('./usersCollection')

async function getUserByEmail(id) {
  return await usersCollection.findById(id)
}

module.exports = getUserByEmail
