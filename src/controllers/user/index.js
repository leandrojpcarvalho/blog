const Service = require('../../services');

const newUser = async (req, res) => {
  const { body } = req;
  const { status, payload } = await Service.user.newUser(body);
  res.status(status).json(payload);
};

module.exports = {
  newUser,
};
