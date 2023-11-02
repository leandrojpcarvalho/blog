const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../../models');

const signIn = async (body) => {
  const { email, password } = body;
  const result = await User.findOne({
    where: {
      [Op.and]: [{ email }, { password }],
    },
  });
  if (result) {
    delete result.dataValues.password;
    const payload = {};
    payload.token = jwt.sign(
      { payload: result.dataValues },
      process.env.JWT_SECRET || 'suaSenhaSecreta',
      { expiresIn: 2000 },
    );
    return { status: 200, payload };
  }
  return { status: 400, payload: { message: 'Invalid fields' } };
};

module.exports = {
  signIn,
};
