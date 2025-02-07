'use strict'
const { Model } = require('sequelize')
const { v4: uuidv4 } = require('uuid') // 引入 UUID 生成方法

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Order 與 User 建立關聯
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
      // Order 與 Product 通過 OrderedItem 建立多對多關聯
      Order.belongsToMany(models.Product, {
        through: models.OrderedItem,
        foreignKey: 'order_id',
        otherKey: 'product_id',
        as: 'products',
      })
    }
  }
  Order.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: uuidv4, // 自動生成 UUID
        unique: true,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['pending', 'completed', 'cancelled']], // 限制狀態的值
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      chosen_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'Orders',
      underscored: true,
      timestamps: true, // 啟用自動管理 createdAt 和 updatedAt
    }
  )
  return Order
}
