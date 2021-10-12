const usersCollection = require('./usersCollection')

async function deleteTokenFromUser(userId) {
  await usersCollection.findByIdAndUpdate(userId, { token: null })
}

module.exports = deleteTokenFromUser
