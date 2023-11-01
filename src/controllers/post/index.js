const Service = require('../../services');

const getAll = async (_req, res) => {
  const data = await Service.post.getAll();
  res.status(200).json(data);
};

module.exports = {
  getAll,
};