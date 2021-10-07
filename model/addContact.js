const contactsCollection = require('./contactsCollection')

async function addContact(data) {
  const newContact = {
    name: data.name,
    email: data.email,
    phone: data.phone,
  }

  try {
    return await contactsCollection.create(newContact)
  } catch (error) {
    return null
  }
}

module.exports = addContact
