const error = require('./error');
const utilsFunctions = require('./utils');

const utils = {
  ...error,
  ...utilsFunctions,
};

module.exports = utils;
