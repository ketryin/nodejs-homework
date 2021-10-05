const listContacts = require("./listContacts");
const fs = require("fs/promises");
const path = require("path");
 
const contactsPath = path.join(__dirname, "contacts.json");

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  if (contacts.length === newContacts.length) {
    return false;
  }

  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = removeContact;