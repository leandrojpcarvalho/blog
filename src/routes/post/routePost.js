const routePost = require('express').Router();
const Controllers = require('../../controllers/users');

routePost.get('/', Controllers.post.getAll);

module.exports = routePost;