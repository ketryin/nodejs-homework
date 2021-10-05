const { Schema, model } = require("mongoose");

const contactShema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
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
});

const contactsCollection = model("contacts", contactShema);

module.exports = contactsCollection;