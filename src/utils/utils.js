const jwt = require('jsonwebtoken');

const tokenGenerate = (data) => {
  const payload = {};
  payload.token = jwt.sign(
    { payload: data },
    process.env.JWT_SECRET || 'suaSenhaSecreta',
    { expiresIn: 2000 },
  );
  return payload;
};

module.exports = {
  tokenGenerate,
};