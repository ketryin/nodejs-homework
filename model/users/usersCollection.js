const { Schema, model } = require('mongoose')

const userShema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  avatarUrl: {
    type: String,
    required: true
  }
}, { versionKey: false, timestamps: true })

const usersCollection = model('users', userShema)

module.exports = usersCollection
