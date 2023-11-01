const PostCategories = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  {
    tableName: 'post_categories',
    underscored: true,
    timestamps: false
  });
  return PostCategoriesTable;
}

module.exports = PostCategories;