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
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Product',
      underscored: true,
    }
  )
  return Product
}
