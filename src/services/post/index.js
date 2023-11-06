const { Op } = require('sequelize');
const { BlogPost, User, Category, PostCategory } = require('../../models');
const utils = require('../../utils');

const getAll = async () => BlogPost.scope().findAll(
  {
    include: [
      { attributes: { exclude: ['password'] }, model: User, as: 'user' },
      { through: { attributes: [] }, model: Category, as: 'categories' },
    ],
  },
);

const newPost = async (body) => {
  const theseCategoriesExists = await utils.validateArray(body, Category);
  if (theseCategoriesExists.map((e) => e[0]).includes(undefined)) {
    return utils.errorGenerator(
      'BAD REQUEST',
      'one or more "categoryIds" not found',
    );
  }
  const { dataValues } = await BlogPost.create(body);
  await Promise.all(
    body.categoryIds.map((categoryId) =>
      PostCategory.create({
        categoryId,
        postId: dataValues.id,
      })),
  );
  return { status: 201, payload: dataValues };
};

const getById = async (id) => {
  const result = await BlogPost.findAll({ 
    where: { id },
    include: [
      { attributes: { exclude: ['password'] }, model: User, as: 'user' },
      { through: { attributes: [] }, model: Category, as: 'categories' },
    ],
  });
  if (!result[0]) return utils.errorGenerator('NOT FOUND', 'Post does not exist');
  return { status: 200, payload: result[0] };
};

const putById = async ({ title, content, id, user }) => {
  const thisPostExist = await BlogPost.findOne({ where: { id } });
  if (!thisPostExist) return utils.errorGenerator('NOT FOUND', 'Post not Found');
  const thisIsTheOwner = await BlogPost.findOne({ where: { userId: user.id, id } });
  if (!thisIsTheOwner) return utils.errorGenerator('UNAUTHORIZED', 'Unauthorized user');
  await BlogPost.update({ title, content }, { where: { id } });
  const { payload } = await getById(id);
  return { status: 200, payload };
};

const deletePost = async ({ userId, postId }) => {
  const thisPostExist = await BlogPost.findOne({ where: { id: postId } });
  if (!thisPostExist) return utils.errorGenerator('NOT FOUND', 'Post does not exist');
  if (thisPostExist.userId !== userId) { 
    return utils.errorGenerator('UNAUTHORIZED', 'Unauthorized user');
  }
  await BlogPost.destroy({ where: { id: postId } });
  return { status: 204, payload: '' };
};

const searchTerm = async (term) => {
  const result = await BlogPost.findAll({ 
    where: { 
      [Op.or]: [{ title: { [Op.like]: `${term}%` } }, { content: { [Op.like]: `${term}%` } }],
    },
    include: [
      { attributes: { exclude: ['password'] }, model: User, as: 'user' },
      { through: { attributes: [] }, model: Category, as: 'categories' },
    ],
  });
  return { status: 200, payload: result };
};

module.exports = {
  getAll,
  newPost,
  getById,
  putById,
  deletePost,
  searchTerm,
};
