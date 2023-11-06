const post = require('express').Router();
const Controllers = require('../../controllers');
const middlewares = require('../../middlewares');

post.put('/:id', middlewares.tokenValidation, middlewares.putValidation, Controllers.post.putById);
post.get('/search', middlewares.tokenValidation, Controllers.post.searchTerm);
post.delete('/:id', middlewares.tokenValidation, Controllers.post.deletePost);
post.get('/:id', middlewares.tokenValidation, Controllers.post.getById);
post.post('/', middlewares.tokenValidation, middlewares.postValidation, Controllers.post.newPost);
post.get('/', middlewares.tokenValidation, Controllers.post.getAll);

module.exports = post;