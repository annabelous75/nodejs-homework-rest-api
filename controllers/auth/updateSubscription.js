const { User } = require("../../models/users");

const { HttpError } = require("../../helpers");

const subscription = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await User.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    next(HttpError(404, "Not found"));
  }

  res.status(200).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = subscription;