const Service = require('../../services');

const newUser = async (req, res) => {
  const { body } = req;
  const { status, payload } = await Service.user.newUser(body);
  return res.status(status).json(payload);
};

const getAll = async (req, res) => {
  const { status, payload } = await Service.user.getAll();
  return res.status(status).json(payload);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);
  const { status, payload } = await Service.user.getById(id);
  return res.status(status).json(payload);
};

module.exports = {
  newUser,
  getAll,
  getById,
};
