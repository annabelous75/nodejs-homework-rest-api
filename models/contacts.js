const contactmodel = require('./schemas/contact');

const listContacts = async userId => {
  const results = await contactmodel.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email subscription -_id',
  });
  return results;
};

const getContactById = async (contactId, userId) => {
  const result = await contactmodel.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email subscription -_id',
  });

  return result;
};

const removeContact = async (contactId, userId) => {
  const contact = await contactmodel.findOne({
    _id: contactId,
    owner: userId,
  });
  if (!contact) {
    throw new Error('Contact not found or unauthorized');
  }
  await contactmodel.findByIdAndRemove(contactId);
  return contact;
};

const addContact = async body => {
  const result = await contactmodel.create(body);
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const result = await contactmodel.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};