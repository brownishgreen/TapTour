'use strict';
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // Comment 與 User 建立關聯
      Comment.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
      // Comment 與 Activity 建立關聯
      Comment.belongsTo(models.Activity, {
        foreignKey: 'activity_id',
        as: 'activity',
      })
      // Comment 與 Location 建立關聯
      Comment.belongsTo(models.Location, {
        foreignKey: 'location_id',
        as: 'location',
      })
      // Comment 與 Product 建立關聯
      Comment.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      })
    }
  }
  Comment.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true, // 內容不能為空
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 允許匿名評論
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      activity_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 可選，僅當評論與活動相關時使用
        references: {
          model: 'Activities',
          key: 'id',
        },
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 可選，僅當評論與地點相關時使用
        references: {
          model: 'Locations',
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 可選，僅當評論與商品相關時使用
        references: {
          model: 'Products',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'Comments',
      underscored: true,
      timestamps: true,
    }
  )
  return Comment
}
