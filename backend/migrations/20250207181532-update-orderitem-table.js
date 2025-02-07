'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('OrderProducts', 'OrderedItems')

    await queryInterface.addColumn('OrderedItems', 'activity_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Activities', // 假設有 Activity 表
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })

    await queryInterface.addColumn('OrderedItems', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    })
  },

  async down(queryInterface, Sequelize) {
    // 還原刪除的欄位
    await queryInterface.removeColumn('OrderedItems', 'activity_id')
    await queryInterface.removeColumn('OrderedItems', 'quantity')

    // 恢復原始表名
    await queryInterface.renameTable('OrderedItems', 'OrderProducts')
  },
}
