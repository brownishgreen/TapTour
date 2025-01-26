'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Location.hasMany(models.Comment, { foreignKey: 'locationId' })
      Location.hasMany(models.Activity, { foreignKey: 'locationId' })
      Location.hasMany(models.Image, { foreignKey: 'locationId' })
      Location.hasMany(models.Product, { foreignKey: 'locationId' })
    }
  }
  Location.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      latitude: DataTypes.DECIMAL(10, 6),
      longitude: DataTypes.DECIMAL(10, 6),
      placeId: DataTypes.INTEGER,
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

