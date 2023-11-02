const post = require('express').Router();
const Controllers = require('../../controllers');

post.get('/', Controllers.post.getAll);

module.exports = post;