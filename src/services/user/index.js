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
    attributes: ['displayName', 'id', 'image', 'email'],
  });
  return { status: 200, payload };
};

const getById = async (id) => {
  const payload = await User.findOne({
    where: {
      id,
    },
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  if (payload) return { status: 200, payload };
  return utils.errorGenerator('NOT FOUND', 'User does not exist');
};

module.exports = {
  newUser,
  getAll,
  getById,
};
