const Joi = require("Joi");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .default("starter")
    .valid("starter", "pro", "business")
    .required(),
});

const schemas = {
  signupSchema,
  loginSchema,
  updateSubscriptionSchema,
};

module.exports = {
  schemas,
};