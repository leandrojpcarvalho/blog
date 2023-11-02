const { Op } = require('sequelize');
const { User } = require('../../models');
const utils = require('../../utils');

const signIn = async (body) => {
  const { email, password } = body;
  const result = await User.findOne({
    where: {
      [Op.and]: [{ email }, { password }],
    },
  });
  if (result) {
    delete result.dataValues.password;
    return { status: 200, payload: utils.tokenGenerate(result.dataValues) };
  }
  return utils.errorGenerator('BAD REQUEST', 'Invalid fields');
};

module.exports = {
  signIn,
};
