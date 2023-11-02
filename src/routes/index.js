const login = require('./login');
const post = require('./post/routePost');
const user = require('./user');
const categories = require('./categories');

const Routes = {
  post,
  login,
  user,
  categories,
};

module.exports = Routes;
