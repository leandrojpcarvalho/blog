const routeUser = require('express').Router();
const Controllers = require('../../controllers');
const middlewares = require('../../middlewares');

routeUser.post('/', middlewares.userValidation, Controllers.user.newUser);

module.exports = routeUser;