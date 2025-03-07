'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      auth_type: {
        type: Sequelize.ENUM('local', 'google'),
        allowNull: false,
        defaultValue: 'local',
      },
      password: {
        type: Sequelize.STRING
      },
      google_id: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('Users');
  }
};