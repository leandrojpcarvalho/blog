const { BlogPosts } = require('../../models');

const getAll = async () => BlogPosts.findAll();

module.exports = {
  getAll,
};