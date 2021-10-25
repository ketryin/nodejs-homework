const express = require('express')
const multer = require('multer')
const router = express.Router()
const validationMiddleware = require('../../middlewares/validationMiddleware')
const authMiddleware = require('../../middlewares/authMiddleware')
const { userSchema, subscriptionSchema, verifyEmailSchema } = require('../../validations/validationSchemas')

const getUserByEmail = require('../../model/users/getUserByEmail')
const getUserById = require('../../model/users/getUserById')
const getUserByVerifyToken = require('../../model/users/getUserByVerifyToken')
const createUser = require('../../model/users/createUser')
const generateToken = require('../../model/users/generateToken')
const setTokenToUser = require('../../model/users/setTokenToUser')
const deleteTokenFromUser = require('../../model/users/deleteTokenFromUser')
const updateSubscription = require('../../model/users/updateSubscription')
const updateAvatar = require('../../model/users/updateAvatar')
const verifyUser = require('../../model/users/verifyUser')
const sendVerifyEmail = require('../../model/users/sendVerifyEmail')

const upload = multer({ dest: 'tmp/' })

router.get('/current', authMiddleware, async (req, res) => {
  const currentUser = await getUserById(req.userId)

  if (!currentUser) {
    res.status(401).json({ message: 'Not authorized.' })
    return
  }

  res.status(200).json({ email: currentUser.email, subscription: currentUser.subscription, avatarUrl: currentUser.avatarUrl })
})

router.post('/signup', validationMiddleware(userSchema), async (req, res) => {
  const { email, password } = req.body
  const user = await getUserByEmail(email)

  if (user) {
    res.status(409).json({ message: 'Email in use.' })
    return
  }

  const createdUser = await createUser(email, password)
  await sendVerifyEmail(createdUser.email, createdUser.verifyToken)

  res.status(201).json({ email: createdUser.email, subscription: createdUser.subscription, avatarUrl: createdUser.avatarUrl })
})

router.post('/login', validationMiddleware(userSchema), async (req, res) => {
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

router.post('/logout', authMiddleware, async (req, res) => {
  const currentUser = await getUserById(req.userId)

  if (!currentUser) {
    res.status(401).json({ message: 'Not authorized.' })
    return
  }

  await deleteTokenFromUser(req.userId)

  res.status(204).json({})
})

router.patch('/', authMiddleware, validationMiddleware(subscriptionSchema), async (req, res) => {
  const allowedSubscriptions = ['starter', 'pro', 'business']

  if (!allowedSubscriptions.find(sub => req.body.subscription === sub)) {
    res.status(400).json({ message: 'Current subscription type is not allowed.' })
    return
  }

  await updateSubscription(req.userId, req.body.subscription)

  res.status(200).json({ messsage: 'Subscription updated successfully.' })
})

router.patch('/avatars', authMiddleware, upload.single('avatar'), async (req, res) => {
  const avatarFile = req.file
  const avatarUrl = await updateAvatar(req.userId, avatarFile)

  res.status(200).json({ avatarUrl })
})

router.get('/verify/:verifyToken', async (req, res) => {
  const verifyToken = req.params.verifyToken
  const user = await getUserByVerifyToken(verifyToken)

  if (!user) {
    res.status(404).json({ message: 'User not found.' })
    return
  }

  await verifyUser(user._id.toString())

  res.status(200).json({ message: 'Verification successful.' })
})

router.post('/verify', validationMiddleware(verifyEmailSchema), async (req, res) => {
  const { email } = req.body
  const user = await getUserByEmail(email)

  if (!user) {
    res.status(404).json({ message: 'User not found.' })
    return
  }

  if (user.verify) {
    res.status(400).json({ message: 'Verification has already been passed.' })
    return
  }

  await sendVerifyEmail(user._id.toString(), user.verifyToken)

  res.status(200).json({ message: 'Verification email sent.' })
})

module.exports = router
