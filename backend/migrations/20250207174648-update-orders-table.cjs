'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'uuid', {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
    }),
      await queryInterface.addColumn('Orders', 'chosen_date', {
        type: Sequelize.DATEONLY,
        allowNull: false,
      })
    await queryInterface.removeColumn('Orders', 'name')
    await queryInterface.removeColumn('Orders', 'email')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'uuid')
    await queryInterface.removeColumn('Orders', 'chosen_date')
    await queryInterface.addColumn('Orders', 'name', {
      type: Sequelize.STRING,
    })
    await queryInterface.addColumn('Orders', 'email', {
      type: Sequelize.STRING,
    })
  },
}
