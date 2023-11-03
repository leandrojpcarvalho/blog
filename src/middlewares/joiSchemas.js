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

const postSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(5).max(255).required(),
  categoryIds: Joi.array().min(1).items(Joi.number().min(1)).required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'number.base': 'the Id must be a number',
  'string.empty': 'Some required fields are missing',
});

const categorySchema = Joi.object({
  name: Joi.string().min(1).required(),
});

const schemas = {
  loginSchema,
  userSchema,
  categorySchema,
  postSchema,
};

module.exports = schemas;
