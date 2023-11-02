const utils = require('../utils');
const schemas = require('./joiSchemas');

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
    res.status(status).json(payload);
  }
};

module.exports = {
  loginValidation,
  userValidation,
};
