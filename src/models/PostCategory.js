const PostCategories = (sequelize, DataTypes) => {
  const PostCategoriesTable = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      references: {
        model: 'BlogPost',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      references: {
        model: 'Category',
        key: 'id'
      }
    },
  },
  {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false
  });

  PostCategoriesTable.associate = ({ BlogPost, Category, User}) => {
    BlogPost.belongsToMany(Category, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: 'PostCategory',
      as:'categories'
    })
    BlogPost.addScope('categoryLimited', {
          include: [
        {
          attributes: {
            exclude: ['password'],
          },
          model: User,
          as: 'user',
        },
        {
          through: {
            attributes: [],
          },
          model: Category,
          as: 'categories',
        },
      ],
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