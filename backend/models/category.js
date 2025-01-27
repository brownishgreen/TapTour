'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {
      // Category 與 Activity, Product 建立一對多關係
      Category.hasMany(models.Activity, { foreignKey: 'category_id', as: 'activities' });
      Category.hasMany(models.Product, { foreignKey: 'category_id', as: 'products' });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, 
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Categories',
      underscored: true, 
    }
  );
  return Category;
};
