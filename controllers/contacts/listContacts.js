const { Contact } = require("../../models/contacts");

const listContacts = async (req, res, next) => {
  const { _id } = req.user;

  const {
    page = 1,
    limit = 20,
    favorite = { $exists: true || false },
  } = req.query;

  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner: _id, favorite: favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id email subscription");

  res.json(result);
};

module.exports = listContacts;