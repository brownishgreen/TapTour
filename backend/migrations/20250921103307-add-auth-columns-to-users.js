'use strict'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Users', 'auth_type', {
    type: Sequelize.ENUM('local', 'google'),
    allowNull: false,
    defaultValue: 'local',
    after: 'email',
  })

  await queryInterface.addColumn('Users', 'google_id', {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    after: 'auth_type',
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn('Users', 'google_id')
  await queryInterface.removeColumn('Users', 'auth_type')
}
