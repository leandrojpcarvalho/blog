const BlogPostsSchema=(sequelize, DataTypes) => {
  const BlogPostsTable = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    tableName:'blog_posts',
    underscored: true,
    timestamps: false
  });

  BlogPostsTable.associate = (models) => {
    BlogPostsTable.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'user'
    });
    BlogPostsTable.hasMany(models.PostCategory, {
      foreignKey: 'postId',
      as: 'posts'
    });
  }

  return BlogPostsTable
}

module.exports = BlogPostsSchema;