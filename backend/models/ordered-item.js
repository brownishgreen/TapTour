'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class OrderedItem extends Model {
    static associate(models) {
      // 沒有額外的直接關聯，因為這是一個中介表
    }
  }
  OrderedItem.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      activity_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Activities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // 預設數量為 1
      },
    },
    {
      sequelize,
      modelName: 'OrderedItem',
      tableName: 'OrderedItems',
      underscored: true, // 使用 snake_case 欄位命名
      timestamps: true, // 不需要 createdAt 和 updatedAt
    }
  )
  return OrderedItem
}
