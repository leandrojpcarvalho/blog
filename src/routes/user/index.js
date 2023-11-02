const routeUser = require('express').Router();
const Controllers = require('../../controllers');
const middlewares = require('../../middlewares');

routeUser.post('/', middlewares.userValidation, Controllers.user.newUser);
routeUser.get('/:id', middlewares.tokenValidation, Controllers.user.getById);
routeUser.get('/', middlewares.tokenValidation, Controllers.user.getAll);

module.exports = routeUser;