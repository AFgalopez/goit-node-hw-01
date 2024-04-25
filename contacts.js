const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  try {
    const data = fs.readFileSync(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.error('Error listing contacts:', error);
  }
}

function getContactById(contactId) {
  try {
    const data = fs.readFileSync(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contact = contacts.find(contact => contact.id === contactId);
    console.table(contact);
  } catch (error) {
    console.error('Error getting contact:', error);
  }
}

function removeContact(contactId) {
  try {
    let data = fs.readFileSync(contactsPath, 'utf8');
    let contacts = JSON.parse(data);
    contacts = contacts.filter(contact => contact.id !== contactId);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`Contact with ID ${contactId} removed successfully.`);
  } catch (error) {
    console.error('Error removing contact:', error);
  }
}

function addContact(name, email, phone) {
  try {
    const newContact = { id: Date.now().toString(), name, email, phone };
    let data = fs.readFileSync(contactsPath, 'utf8');
    let contacts = JSON.parse(data);
    contacts.push(newContact);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('Contact added successfully:');
    console.table(newContact);
  } catch (error) {
    console.error('Error adding contact:', error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
