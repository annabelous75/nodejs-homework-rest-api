const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  const result = await Contact.findOne({
    _id: contactId,
    owner: _id,
  }).populate("owner", "-_id name email");

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = getContactById;