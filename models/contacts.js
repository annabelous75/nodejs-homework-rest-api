const { v4: uuid } = require('uuid')
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, '/contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(({ id }) => id.toString() === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const contactIndex = contacts.findIndex(({ id }) => id.toString() === contactId)
  if (contactIndex === -1) return
  const [removedContact] = contacts.splice(contactIndex, 1)
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2),
    'utf8'
  )
  return removedContact
}
const addContact = async (body) => {
  const contacts = await listContacts()
  const id = uuid()
  const newContact = { id, ...body }
  contacts.push(newContact)
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2),
    'utf8'
  )
  return newContact
}


const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(({ id }) => id.toString() === contactId)
  if (index === -1) return
  contacts[index] = { ...contacts[index], ...body }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8')
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
