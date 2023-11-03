const BlogPostsSchema=(sequelize, DataTypes) => {
  const BlogPostsTable = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    tableName:'blog_posts',
    underscored: true,
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated'
  });

  BlogPostsTable.associate = (models) => {
    BlogPostsTable.belongsTo(models.User, {
      foreignKey: 'userId',
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