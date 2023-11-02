const category = require('express').Router();
const Controllers = require('../../controllers');
const middlewares = require('../../middlewares');

category.post(
  '/',
  middlewares.tokenValidation,
  middlewares.categoryValidation,
  Controllers.categories.newCategory,
);

module.exports = category;
