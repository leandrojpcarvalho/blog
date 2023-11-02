const routePost = require('express').Router();
const Controllers = require('../../controllers');

routePost.get('/', Controllers.post.getAll);

module.exports = routePost;