const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json');

// Ensure data folder and files exist
function initStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
  if (!fs.existsSync(VISITORS_FILE)) {
    fs.writeFileSync(VISITORS_FILE, JSON.stringify({ count: 105 }, null, 2), 'utf8'); // Start with a premium initial visitor count
  }
}

// Get contact forms
function getContacts() {
  initStorage();
  try {
    const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading contacts JSON file:', err);
    return [];
  }
}

// Save a contact form
function saveContact(contact) {
  initStorage();
  try {
    const contacts = getContacts();
    const newContact = {
      _id: 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      name: contact.name,
      email: contact.email,
      subject: contact.subject || 'No Subject',
      message: contact.message,
      createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf8');
    return newContact;
  } catch (err) {
    console.error('Error writing contact to JSON file:', err);
    throw err;
  }
}

// Get visitor stats
function getVisitorCount() {
  initStorage();
  try {
    const data = fs.readFileSync(VISITORS_FILE, 'utf8');
    const stats = JSON.parse(data);
    return stats.count || 105;
  } catch (err) {
    return 105;
  }
}

// Increment visitors count
function incrementVisitorCount() {
  initStorage();
  try {
    const data = fs.readFileSync(VISITORS_FILE, 'utf8');
    const stats = JSON.parse(data);
    stats.count = (stats.count || 105) + 1;
    fs.writeFileSync(VISITORS_FILE, JSON.stringify(stats, null, 2), 'utf8');
    return stats.count;
  } catch (err) {
    console.error('Error incrementing visitors in JSON file:', err);
    return 106;
  }
}

module.exports = {
  getContacts,
  saveContact,
  getVisitorCount,
  incrementVisitorCount
};
