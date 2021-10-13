const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: 'Not authorized.' })
    return
  }

  try {
    const token = req.headers.authorization.slice(7)
    const user = jwt.decode(token, SECRET_KEY)

    if (!user) {
      res.status(401).json({ message: 'Token is invalid.' })
      return
    }

    req.userId = user._id
    req.token = token

    next()
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid.' })
  }
}

module.exports = authMiddleware
