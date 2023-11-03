const UsersSchema = (sequelize, DataType) => {
  const userTable = sequelize.define('User', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    displayName: DataType.STRING,
    email: DataType.STRING,
    password: DataType.STRING,
    image: DataType.STRING,
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false
  });

  userTable.associate = (models) => {
    userTable.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'user'
    })
  }
  return userTable;
}

module.exports = UsersSchema;