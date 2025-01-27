'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Order 與 User 建立關聯
      Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      // Order 與 Product 通過 OrderProduct 建立多對多關聯
      Order.belongsToMany(models.Product, {
        through: models.OrderProduct,
        foreignKey: 'order_id',
        otherKey: 'product_id',
        as: 'products',
      });
    }
  }
  Order.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, 
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          isEmail: true,
        },
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
  );
  return Order;
};
