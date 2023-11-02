const utils = require('../utils');
const schemas = require('./joiSchemas');

const loginValidation = async (req, res, next) => {
  const { body } = req;
  try {
    await schemas.loginSchema.validateAsync(body);
    next();
  } catch (error) {
    const { errorCode, errorMessage: message } = utils.errorGenerator(error.details[0].type);
    res.status(errorCode).json({ message });
  }
};

module.exports = {
  loginValidation,
};
