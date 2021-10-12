const contactsCollection = require('./contactsCollection')

async function listContacts(userId) {
  try {
    return await contactsCollection.find({ owner: userId })
  } catch (error) {
    return []
  }
};

module.exports = listContacts
