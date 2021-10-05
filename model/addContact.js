const listContacts = require("./listContacts");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function addContact(data) {
  const contacts = await listContacts();
  const id = contacts[contacts.length - 1].id + 1;

  const newContact = {
    id: id,
    name: data.name,
    email: data.email,
    phone: data.phone,
  };

  contacts.push(newContact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    return null;
  }
}

module.exports = addContact;