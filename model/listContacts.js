const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath));
};

module.exports = listContacts;