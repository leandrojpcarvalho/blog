const CategoriesSchema = (sequelize, DataTypes) => {
  const CategoriesTable = sequelize.define('Categories', {
    name: DataTypes.CHAR,
  }, {
    tableName:'categories',
    timestamps: false
  });

  CategoriesTable.associate = (models) => {
    CategoriesTable.hasMany(models.PostCategory, {
      foreignKey: 'categoryId',
      as: 'PostByCategory'
    })
  }

  return CategoriesTable;
}

module.exports = CategoriesSchema;