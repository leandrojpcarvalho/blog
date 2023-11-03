const { BlogPost, User, Category, PostCategory } = require('../../models');
const utils = require('../../utils');

const getAll = async () => {
  const result = await BlogPost.findAll({
    include: [
      {
        attributes: {
          exclude: ['password'],
        },
        model: User,
        as: 'user',
      },
      {
        // attributes: {
        //   exclude: ['PostCategory'],
        // },
        model: Category,
        as: 'categories',
      },
    ],
  });

  return utils.removePostCategory(result);
};

const newPost = async (body) => {
  const theseCategoriesExists = await utils.validateArray(body, Category);
  if (theseCategoriesExists.some((e) => e.includes(undefined))) {
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

module.exports = {
  getAll,
  newPost,
};
