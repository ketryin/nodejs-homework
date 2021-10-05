const contactsCollection = require('./contactsCollection')

async function getContactById(contactId) {
  try {
    return await contactsCollection.findById(contactId);
  } catch (error) {
    return null;
  }
}

module.exports = getContactById;