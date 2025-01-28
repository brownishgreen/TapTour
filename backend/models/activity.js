'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {

    static associate(models) {
      // Activity 與 Location、Category、Image 和 Comment 建立關聯
      Activity.belongsTo(models.Location, { foreignKey: 'location_id', as: 'location' });
      Activity.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Activity.hasMany(models.Image, { foreignKey: 'activity_id', as: 'images' });
      Activity.hasMany(models.Comment, { foreignKey: 'activity_id', as: 'comments' });
    }
  }
  Activity.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, 
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, 
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true, 
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true, 
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        validate: {
          isInt: true, // 確保為整數
        },
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
          model: 'Locations',
          key: 'id',
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Activity',
      tableName: 'Activities',
      underscored: true, 
    }
  );
  return Activity;
};
