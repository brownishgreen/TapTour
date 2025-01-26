'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      Location.hasMany(models.Activity, { foreignKey: 'location_id' })
    }
  }
  Location.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
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
    modelName: 'Location',
    tableName: 'Locations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    locationId: 'location_id',
    categoryId: 'category_id',
    activityId: 'activity_id'
  });
  return Location;
};