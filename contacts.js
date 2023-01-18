const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const contactsParse = JSON.parse(contacts);
    console.table(contactsParse);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const contactsParse = JSON.parse(contacts);
    const contact = await contactsParse.find(
      (contact) => Number(contact.id) === Number(contactId)
    );
    console.log(contact);
  } catch (error) {
    console.log(error.message);
  }
}

//
async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const contactsParse = JSON.parse(contacts);
    const contact = await contactsParse.filter(
      (contact) => Number(contact.id) !== Number(contactId)
    );
    console.table(contact);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const newContact = {
      id: Math.random().toString(),
      name: name,
      email: email,
      phone: phone,
    };
    console.log(newContact);
    const newContacts = [...JSON.parse(contacts), newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = { listContacts, getContactById, removeContact, addContact };
