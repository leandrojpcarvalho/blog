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

module.exports = {
  newUser,
};
