const { Schema, SchemaTypes, model } = require('mongoose')

const contactShema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true })

const contactsCollection = model('contacts', contactShema)

module.exports = contactsCollection
