const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().strict().required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  loginSchema,
};

module.exports = schemas;