const PostCategories = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog_posts',
        key: 'id',
      },
    },
    categoryId: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      }
    },
  },
  {
    tableName: 'post_categories',
    underscored: true,
    timestamps: false
  });

  PostCategoriesTable.associate = ({ BlogPost, Category}) => {
    BlogPost.belongsToMany(Category, {
      through: 'PostCategory',
    })
    Category.belongsToMany(BlogPost, {
      through: 'PostCategory',
    })
  }

  return PostCategoriesTable;
}

module.exports = PostCategories;