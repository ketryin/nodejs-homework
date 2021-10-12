const contactsCollection = require('./contactsCollection')

async function addContact(data, userId) {
  const newContact = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    owner: userId
  }

  try {
    return await contactsCollection.create(newContact)
  } catch (error) {
    return null
  }
}

module.exports = addContact
