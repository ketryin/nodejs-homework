const listContacts = require("./listContacts");

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

module.exports = getContactById;