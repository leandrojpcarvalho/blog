const UsersSchema = (sequelize, DataType) => {
  const userTable = sequelize.define('Users', {
    displayName: DataType.STRING,
    email: DataType.STRING,
    password: DataType.STRING,
    image: DataType.STRING,
  }, {
    tableName: 'users',
    underscored: true,
    timestamp: false
  });

  userTable.associate = (models) => {
    userTable.hasMany(models.BlogPosts, {
      foreignKey: 'userId',
      as: 'posts',
    })
  }
  return userTable;
}

module.exports = UsersSchema;