'use strict';
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Image extends Model {

    static associate(models) {
      // Image 與 Activity 建立關聯
      Image.belongsTo(models.Activity, { foreignKey: 'activity_id', as: 'activity' });
      // Image 與 Location 建立關聯
      Image.belongsTo(models.Location, { foreignKey: 'location_id', as: 'location' });
      // Image 與 Product 建立關聯
      Image.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    }
  }
  Image.init(
    {
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false, // 圖片 URL 為必填
        validate: {
          notEmpty: true, // 確保不為空
        },
      },
      activity_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 與活動關聯時可選
        references: {
          model: 'Activities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 與地點關聯時可選
        references: {
          model: 'Locations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // 與商品關聯時可選
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'Images',
      underscored: true, 
      timestamps: true, 
    }
  );
  return Image;
};
