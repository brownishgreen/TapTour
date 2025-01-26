'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Comment, { foreignKey: 'productId' })
      Product.belongsToMany(models.Order, {
        through: models.OrderProduct,
        foreignKey: 'productId',
        as: 'belongedOrders'
      })
      Product.hasMany(models.Image, { foreignKey: 'productId' })
      Product.belongsTo(models.Location, { foreignKey: 'locationId' })
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      locationId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Product',
      underscored: true,
    }
  )
  return Product
}
