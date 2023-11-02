const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().strict().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().strict().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().allow(''),
});

const schemas = {
  loginSchema,
  userSchema,
};

module.exports = schemas;
