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

const removePostCategory = (data) => (data
  .reduce((acc, currPost) => {
    const newObj = currPost;
    newObj.categories = currPost.categories.map((category) => {
      const newCategory = category;
      delete newCategory.dataValues.PostCategory;
      return newCategory;
    });
    acc.push(newObj);
    return acc;
  }, []));

const validateArray = async (arr, func) => Promise
  .all(arr.categoryIds.map((id) => func.findAll({ where: { id } })));

module.exports = {
  tokenGenerate,
  removePostCategory,
  validateArray,
};