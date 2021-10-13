const bcrypt = require('bcrypt')
const usersCollection = require('./usersCollection')

const saltRounds = 10

async function createUser(email, password) {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)

  await usersCollection.create({ email, password: hash })
  return await usersCollection.findOne({ email })
}

module.exports = createUser
