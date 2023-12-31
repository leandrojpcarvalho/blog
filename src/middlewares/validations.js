const jwt = require('jsonwebtoken');
const utils = require('../utils');
const schemas = require('./joiSchemas');

const SECRET = process.env.JWT_SECRET || 'suaSenhaSecreta';

const loginValidation = async (req, res, next) => {
  const { body } = req;
  try {
    await schemas.loginSchema.validateAsync(body);
    next();
  } catch (error) {
    const { status, payload } = utils.errorGenerator(
      error.details[0].type,
      error.message,
    );
    return res.status(status).json(payload);
  }
};

const userValidation = async (req, res, next) => {
  const { body } = req;
  try {
    await schemas.userSchema.validateAsync(body);
    next();
  } catch (error) {
    const { status, payload } = utils.errorGenerator(
      error.details[0].type,
      error.message,
    );
    return res.status(status).json(payload);
  }
};

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) throw new Error('jwt must be provided');
    const auth = authorization.split(' ')[1]
      ? authorization.split(' ')[1]
      : authorization.split(' ')[0];
    const response = jwt.verify(auth, SECRET);
    req.validation = response.payload;
    next();
  } catch (error) {
    const { status, payload } = utils.errorGenerator(error.message);
    return res.status(status).json(payload);
  }
};

const categoryValidation = async (req, res, next) => {
  const { body } = req;
  try {
    await schemas.categorySchema.validateAsync(body);
    next();
  } catch (error) {
    const { status, payload } = utils.errorGenerator(error.details[0].type, error.message);
    return res.status(status).json(payload);
  }
};

const postValidation = async (req, res, next) => {
  const { body } = req;
  try {
    await schemas.postSchema.validateAsync(body);
    next();
  } catch (error) {
    const { status, payload } = utils.errorGenerator(error.details[0].type, error.message);
    return res.status(status).json(payload);
  }
};

const putValidation = async (req, res, next) => {
  const { body } = req;
  try {
    await schemas.putSchema.validateAsync(body);
    next();
  } catch (error) {
    const { status, payload } = utils.errorGenerator(error.details[0].type, error.message);
    return res.status(status).json(payload);
  }
};

module.exports = {
  loginValidation,
  userValidation,
  tokenValidation,
  categoryValidation,
  postValidation,
  putValidation,
};
