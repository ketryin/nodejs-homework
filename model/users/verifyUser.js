const usersCollection = require('./usersCollection')

async function verifyUser(userId) {
  await usersCollection.findByIdAndUpdate(userId, { verify: true, verifyToken: null })
}

module.exports = verifyUser
