const Service = require('../../services');

const newCategory = async (req, res) => {
  const { body } = req;
  const { status, payload } = await Service.category.newCategory(body);
  res.status(status).json(payload);
};

const getAll = async (_req, res) => {
  const { status, payload } = await Service.category.getAll();
  return res.status(status).json(payload);
};

module.exports = {
  newCategory,
  getAll,
};
