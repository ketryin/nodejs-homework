const contactsCollection = require('./contactsCollection');

async function listContacts() {
  try {
    return await contactsCollection.find({});
  } catch (error) {
    return [];
  }
};

module.exports = listContacts;