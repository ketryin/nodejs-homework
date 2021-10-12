const usersCollection = require('./usersCollection')

async function setTokenToUser(user, token) {
  await usersCollection.findByIdAndUpdate(user._id, { token })
}

module.exports = setTokenToUser
