const BlogPostsSchema=(sequelize, DataTypes) => {
  const BlogPostsTable = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    tableName:'blog_posts',
    underscored: true,
    timestamps: false
  });

  BlogPostsTable.associate = (models) => {
    BlogPostsTable.hasMany(models.PostCategory, {
      foreignKey: 'postId',
      as: 'posts'
    })
  }

  return BlogPostsTable
}

module.exports = BlogPostsSchema;