'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      Activity.belongsTo(models.Location, { foreignKey: 'location_id' })
      Activity.belongsTo(models.Category, { foreignKey: 'category_id' })
    }
  }
  Activity.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    startDate: {
      type: DataTypes.DATE,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      field: 'end_date'
    },
    price: DataTypes.INTEGER,
    locationId: {
      type: DataTypes.INTEGER,
      field: 'location_id'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id'
    },
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
    modelName: 'Activity',
    tableName: 'Activities',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    categoryId: 'category_id',
    locationId: 'location_id'
  });
  return Activity;
};