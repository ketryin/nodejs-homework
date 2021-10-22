const usersCollection = require('./usersCollection')

async function getUserByVerifyToken(verifyToken) {
  return await usersCollection.findOne({ verifyToken })
}

module.exports = getUserByVerifyToken
