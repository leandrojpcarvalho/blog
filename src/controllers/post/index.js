const Service = require('../../services');

const getAll = async (_req, res) => {
  const data = await Service.post.getAll();
  return res.status(200).json(data);
};

const newPost = async (req, res) => {
  const {
    validation: { id },
    body,
  } = req;
  const { status, payload } = await Service.post.newPost({
    ...body,
    userId: id,
  });
  return res.status(status).json(payload);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, payload } = await Service.post.getById(Number(id));
  return res.status(status).json(payload);
};

const putById = async (req, res) => {
  const {
    body,
    params: { id },
    validation,
  } = req;
  const { status, payload } = await Service.post.putById({
    ...body,
    id: Number(id),
    user: validation,
  });
  return res.status(status).json(payload);
};

const deletePost = async (req, res) => {
  const { params: { id }, validation } = req;
  const { status, payload } = await Service.post.deletePost({ userId: validation.id, postId: id });
  return res.status(status).json(payload);
};

const searchTerm = async (req, res) => {
  const { q } = req.query;
  const { status, payload } = await Service.post.searchTerm(q);
  return res.status(status).json(payload);
};

module.exports = {
  getAll,
  newPost,
  getById,
  putById,
  deletePost,
  searchTerm,
};
