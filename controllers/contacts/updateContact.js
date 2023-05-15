const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: _id,
    },
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    next(HttpError(404, "Not found"));
  }

  res.json(result);
};

module.exports = updateContact;