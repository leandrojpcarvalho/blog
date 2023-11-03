const Service = require('../../services');

const getAll = async (_req, res) => {
  const data = await Service.post.getAll();
  return res.status(200).json(data);
};

const newPost = async (req, res) => {
  const { validation: { id }, body } = req;
  const { status, payload } = await Service.post.newPost({ ...body, userId: id });
  return res.status(status).json(payload);
};

module.exports = {
  getAll,
  newPost,
};
