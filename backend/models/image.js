'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Activity, { foreignKey: 'activityId' })
      Image.belongsTo(models.Location, { foreignKey: 'locationId' })
      Image.belongsTo(models.Product, { foreignKey: 'productId' })
    }
  }
  Image.init(
    {
      imageUrl: DataTypes.STRING,
      activityId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Image',
      underscored: true,
    }
  )
  return Image
}
