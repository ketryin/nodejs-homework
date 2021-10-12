const express = require('express')
const router = express.Router()
const validationMiddleware = require('../../middlewares/validationMiddleware')
const authMiddleware = require('../../middlewares/authMiddleware')
const { userSchema, subscriptionSchema } = require('../../validations/validationSchemas')

const getUserByEmail = require('../../model/users/getUserByEmail')
const getUserById = require('../../model/users/getUserById')
const createUser = require('../../model/users/createUser')
const generateToken = require('../../model/users/generateToken')
const setTokenToUser = require('../../model/users/setTokenToUser')
const deleteTokenFromUser = require('../../model/users/deleteTokenFromUser')
const updateSubscription = require('../../model/users/updateSubscription')

router.get('/current', authMiddleware, async (req, res, next) => {
  const currentUser = await getUserById(req.userId)

  if (!currentUser) {
    res.status(401).json({ message: 'Not authorized.' })
    return
  }

  res.status(200).json({ email: currentUser.email, subscription: currentUser.subscription })
})

router.post('/signup', validationMiddleware(userSchema), async (req, res, next) => {
  const { email, password } = req.body
  const user = await getUserByEmail(email)

  if (user) {
    res.status(409).json({ message: 'Email in use.' })
    return
  }

  const createdUser = createUser(email, password)

  res.status(201).json({ email: createdUser.email, subscription: createdUser.subscription })
})

router.post('/login', validationMiddleware(userSchema), async (req, res, next) => {
  const { email, password } = req.body
  const user = await getUserByEmail(email)

  if (!user) {
    res.status(401).json({ message: 'Email or password is wrong.' })
    return
  }

  const token = generateToken(user, password)

  if (!token) {
    res.status(401).json({ message: 'Email or password is wrong.' })
    return
  }

  await setTokenToUser(user, token)

  res.status(200).json({ token: token, user: { email: user.email, subscription: user.subscription } })
})

router.post('/logout', authMiddleware, async (req, res, next) => {
  const currentUser = await getUserById(req.userId)

  if (!currentUser) {
    res.status(401).json({ message: 'Not authorized.' })
    return
  }

  await deleteTokenFromUser(req.userId)

  res.status(204)
})

router.patch('/', authMiddleware, validationMiddleware(subscriptionSchema), async (req, res, next) => {
  const allowedSubscriptions = ['starter', 'pro', 'business']

  if (!allowedSubscriptions.find(sub => req.body.subscription === sub)) {
    res.status(400).json({ message: 'Current subscription type is not allowed.' })
    return
  }

  await updateSubscription(req.userId, req.body.subscription)

  res.status(200).json({ messsage: 'Subscription updated successfully.' })
})

module.exports = router
