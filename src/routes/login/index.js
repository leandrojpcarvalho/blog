const routeLogin = require('express').Router();
const Controllers = require('../../controllers');
const middlewares = require('../../middlewares');

routeLogin.post('/', middlewares.loginValidation, Controllers.login.signIn);

module.exports = routeLogin;