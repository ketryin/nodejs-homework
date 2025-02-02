const contactsCollection = require('./contactsCollection')

async function getContactById(contactId, userId) {
  try {
    const contact = await contactsCollection.findById(contactId)

    if (contact.owner._id.toString() !== userId) {
      return null
    }

    return contact
  } catch (error) {
    return null
  }
}

module.exports = getContactById
