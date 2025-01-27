'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {

    static associate(models) {
      // 沒有額外的直接關聯，因為這是一個中介表
    }
  }
  OrderProduct.init(
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
    },
    {
      sequelize,
      modelName: 'OrderProduct',
      tableName: 'OrderProducts',
      underscored: true, // 使用 snake_case 欄位命名
      timestamps: false, // 不需要 createdAt 和 updatedAt
    }
  );
  return OrderProduct;
};
