const user = require('express').Router();
const Controllers = require('../../controllers');
const middlewares = require('../../middlewares');

user.post('/', middlewares.userValidation, Controllers.user.newUser);
user.get('/:id', middlewares.tokenValidation, Controllers.user.getById);
user.get('/', middlewares.tokenValidation, Controllers.user.getAll);

module.exports = user;