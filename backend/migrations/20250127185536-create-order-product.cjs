'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const isProduction = process.env.NODE_ENV === 'production'
    await queryInterface.createTable('OrderedItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        ...(isProduction ? {} : {
          references: {
            model: 'Orders',
            key: 'id',
          }
        }),
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        ...(isProduction ? {} : {
          references: {
            model: 'Products',
            key: 'id',
          },
        }),
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      activity_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        ...(isProduction ? {} : {
          references: {
            model: 'Activities',
            key: 'id',
          },
        }),
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderedItems')
  }
};
