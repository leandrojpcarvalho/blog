const UsersSchema = (sequelize, DataType) => {
  const userTable = sequelize.define('User', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    displayName: DataType.STRING,
    email: { 
      type: DataType.STRING,
      unique: true
    },
    password: DataType.STRING,
    image: {
      type: DataType.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false
  });

  userTable.associate = (models) => {
    userTable.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'posts',
    })
  }
  return userTable;
}

module.exports = UsersSchema;