const { BlogPost, User, Category, PostCategory } = require('../../models');
const utils = require('../../utils');

const getAll = async () =>
  BlogPost.findAll({
    include: [{ model: User, as: 'user' }],
  });

const newPost = async (body) => {
  const theseCategoriesExists = await Promise.all(
    body.categoryIds.map((id) =>
      Category.findAll({
        where: { id },
      })),
  );
  if (theseCategoriesExists.map((e) => e[0]).includes(undefined)) {
    return utils.errorGenerator(
      'BAD REQUEST',
      'one or more "categoryIds" not found',
    );
  }
  const { dataValues } = await BlogPost.create(body);
  await Promise.all(body.categoryIds.map((categoryId) => PostCategory.create({
    categoryId,
    postId: dataValues.id,
  })));
  return { status: 201, payload: dataValues };
};

module.exports = {
  getAll,
  newPost,
};
