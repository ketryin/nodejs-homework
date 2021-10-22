const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const usersCollection = require('./usersCollection')

const saltRounds = 10

async function createUser(email, password) {
  const salt = bcrypt.genSaltSync(saltRounds)
  const passwordHash = bcrypt.hashSync(password, salt)
  const avatarUrl = gravatar.url(email, { size: 250 })

  await usersCollection.create({ email, password: passwordHash, avatarUrl })
  return await usersCollection.findOne({ email })
}

module.exports = createUser
