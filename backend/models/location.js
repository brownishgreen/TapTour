'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      // Location 與 Activity 和 Product 建立一對多關係
      Location.hasMany(models.Activity, {
        foreignKey: 'location_id',
        as: 'activities',
      })
      Location.hasMany(models.Product, {
        foreignKey: 'location_id',
        as: 'products',
      })
    }
  }
  Location.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
        },
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
        },
      },
      google_place_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      opening_hours: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      google_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Location',
      tableName: 'Locations',
      underscored: true,
    }
  )
  return Location
}
