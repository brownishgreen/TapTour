'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Activity, { foreignKey: 'category_id' })
    }
  }
  Category.init({
    name: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    categoryId: 'category_id',
    locationId: 'location_id'
  });
  return Category;
};