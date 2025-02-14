'use strict';
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      // Product 與 Location 和 Category 建立關聯
      Product.belongsTo(models.Location, { foreignKey: 'location_id', as: 'location' });
      Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Product.hasMany(models.Image, { foreignKey: 'product_id', as: 'images' });
      Product.hasMany(models.Comment, { foreignKey: 'product_id', as: 'comments' });
      Product.belongsToMany(models.Order, {
        through: models.OrderedItem,
        foreignKey: 'product_id',
        otherKey: 'order_id',
        as: 'orders',
      })
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, 
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate: {
          isInt: true, 
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, 
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
      modelName: 'Product',
      tableName: 'Products',
      underscored: true, 
    }
  );
  return Product;
};
