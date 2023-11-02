const Service = require('../../services');

const signIn = async (req, res) => {
  const { body } = req;
  const { status, payload } = await Service.login.signIn(body);
  res.status(status).json(payload);
};

module.exports = {
  signIn,
};
