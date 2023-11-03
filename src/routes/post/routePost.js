const post = require('express').Router();
const Controllers = require('../../controllers');
const middlewares = require('../../middlewares');

post.post('/', middlewares.tokenValidation, middlewares.postValidation, Controllers.post.newPost);
post.get('/', middlewares.tokenValidation, Controllers.post.getAll);

module.exports = post;