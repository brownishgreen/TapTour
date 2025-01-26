'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId' })
      Order.belongsToMany(models.Product, {
        through: models.OrderProduct,
        foreignKey: 'orderId',
        as: 'orderedProducts'
      })
    }
  }
  Order.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      totalAmount: DataTypes.INTEGER,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
      underscored: true,
    }
  )
  return Order
}
