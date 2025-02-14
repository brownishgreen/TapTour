'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Followers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      follower_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // 關聯到 Users 表
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      following_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // 關聯到 Users 表
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Followers')
  },
}
