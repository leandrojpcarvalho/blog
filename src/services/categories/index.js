const { Category } = require('../../models');
const utils = require('../../utils');

const newCategory = async (body) => {
  const thisCategoryExists = await Category.findOne({
    where: {
      name: body.name,
    },
  });
  if (thisCategoryExists) return utils.errorGenerator('CONFLICT', 'This Category already exists');
  const { dataValues } = await Category.create(body);
  return { status: 201, payload: dataValues };
};

const getAll = async () => ({ status: 200, payload: await Category.findAll() });

module.exports = {
  newCategory,
  getAll,
};
