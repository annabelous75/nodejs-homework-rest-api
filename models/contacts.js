const contactmodel = require('./schemas/contact');

const listContacts = async () => {
  const results = await contactmodel.find({});
  return results;
};

const getContactById = async contactId => {
  const result = await contactmodel.findOne({ _id: contactId });

  return result;
};

const removeContact = async contactId => {
  const result = await contactmodel.findByIdAndRemove({
    _id: contactId,
  });
  return result;
};

const addContact = async body => {
  const result = await contactmodel.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await contactmodel.findByIdAndUpdate(
    { _id: contactId },
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
