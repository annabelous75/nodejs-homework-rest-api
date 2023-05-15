const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: _id,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Contact deleted" });
};

module.exports = removeContact;