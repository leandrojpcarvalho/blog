const Service = require('../../services');

const newCategory = async (req, res) => {
  const { body } = req;
  const { status, payload } = await Service.category.newCategory(body);
  res.status(status).json(payload);
};

module.exports = {
  newCategory,
};
