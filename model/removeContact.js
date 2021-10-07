const contactsCollection = require('./contactsCollection')

async function removeContact(contactId) {
  try {
    const contactToDelete = await contactsCollection.findById(contactId)

    if (!contactToDelete) {
      return false
    }

    await contactsCollection.findByIdAndDelete(contactId)
    return true
  } catch (error) {
    return false
  }
}

module.exports = removeContact
