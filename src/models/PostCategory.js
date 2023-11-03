const PostCategories = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false
  });

  PostCategoriesTable.associate = ({ BlogPost, Category}) => {
    BlogPost.belongsToMany(Category, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: 'PostCategory',
      as:'category'
    })
    Category.belongsToMany(BlogPost, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: 'PostCategory',
      as:'posts'
    })
  }

  return PostCategoriesTable;
}

module.exports = PostCategories;