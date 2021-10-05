const contactsCollection = require('./contactsCollection');

async function updateContact(contactId, contactData) {
  try {
    const contactToUpdate = await contactsCollection.findByIdAndUpdate(contactId, { $set: contactData });

    if (!contactToUpdate) {
      return null;
    }

    return await contactsCollection.findById(req.params.contactId);
  } catch (error) {
    return null;
  }
}

module.exports = updateContact;