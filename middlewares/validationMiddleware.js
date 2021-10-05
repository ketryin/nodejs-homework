const validationMiddleware = (schema) => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'Missing fields' })
    return
  }

  const { error } = schema.validate(req.body)

  if (error) {
    res.status(400).json({ status: 'error', message: error.message, code: 400 })
    return
  }

  next()
}

module.exports = validationMiddleware
