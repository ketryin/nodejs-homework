const listContacts = require("./listContacts");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function updateContact(contactId, contactData) {
  const contacts = await listContacts();
  const contactToUpdate = contacts.find((contact) => contact.id === contactId);

  if (!contactToUpdate) {
    return null;
  }

  const updatedContact = { ...contactToUpdate, ...contactData };
  const updatedContacts = contacts.map((contact) => contact.id === contactId ? updatedContact : contact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return updatedContact;
  } catch (error) {
    return null;
  }
}

module.exports = updateContact;