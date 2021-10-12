const contactsCollection = require('./contactsCollection')

async function updateContact(contactId, contactData, userId) {
  try {
    const contactToUpdate = await contactsCollection.findByIdAndUpdate(contactId, { $set: contactData })

    if (!contactToUpdate) {
      return null
    }

    if (contactToUpdate.owner !== userId) {
      return null
    }

    return await contactsCollection.findById(contactId)
  } catch (error) {
    return null
  }
}

module.exports = updateContact
