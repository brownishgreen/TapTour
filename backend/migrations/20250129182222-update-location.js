'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Locations', 'image')

    await queryInterface.addColumn('Locations', 'opening_hours', {
      type: Sequelize.STRING, 
      allowNull: true,
    })

    await queryInterface.addColumn('Locations', 'address', {
      type: Sequelize.STRING,
      allowNull: true,
    })

    await queryInterface.addColumn('Locations', 'google_url', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Locations', 'image', {
      type: Sequelize.STRING,
      allowNull: true,
    })

    await queryInterface.removeColumn('Locations', 'opening_hours')
    await queryInterface.removeColumn('Locations', 'address')
    await queryInterface.removeColumn('Locations', 'google_url')
  }
};
