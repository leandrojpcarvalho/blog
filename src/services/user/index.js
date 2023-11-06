const { User } = require('../../models');
const utils = require('../../utils');

const newUser = async (body) => {
  const { email } = body;
  const isNotEmailAvailable = await User.findOne({
    where: {
      email,
    },
  });
  if (isNotEmailAvailable) return utils.errorGenerator('CONFLICT');
  const result = await User.create(body);
  delete result.dataValues.password;
  return { status: 201, payload: utils.tokenGenerate(result.dataValues) };
};

const getAll = async () => {
  const payload = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { status: 200, payload };
};

const getById = async (id) => {
  const payload = await User.findOne({
    where: {
      id,
    },
    attributes: { exclude: ['password'] },
  });
  if (payload) return { status: 200, payload };
  return utils.errorGenerator('NOT FOUND', 'User does not exist');
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  return { status: 204, payload: '' };
};

module.exports = {
  newUser,
  getAll,
  getById,
  deleteUser,
};
