const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

function generateToken(user, password) {
  if (!bcrypt.compareSync(password, user.password)) {
    return null
  }

  return jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    SECRET_KEY
  )
}

module.exports = generateToken
