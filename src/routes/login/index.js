const login = require('express').Router();
const Controllers = require('../../controllers');
const middlewares = require('../../middlewares');

login.post('/', middlewares.loginValidation, Controllers.login.signIn);

module.exports = login;