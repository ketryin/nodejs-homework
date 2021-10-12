const jwt = require('jsonwebtoken')
require('dotenv').config()

const { SECRET_KEY } = process.env

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: 'Not authorized.' })
    return
  }

  try {
    const token = req.headers.authorization.slice(7)
    const user = jwt.decode(token, SECRET_KEY)

    if (!user) {
      res.status(401).json({ messag: 'Token is invalid.' })
    }

    req.userId = user._id
    req.token = token

    next()
  } catch (error) {
    res.status(401).json({ messag: 'Token is invalid.' })
  }
}

module.exports = auth
