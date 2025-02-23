'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const isProduction = process.env.NODE_ENV === 'production'
    await queryInterface.addColumn('Locations', 'main_image_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      ...(isProduction ? {} : {
        references: {
          model: 'Images',
          key: 'id',
        },
      }),
      onUpdate: 'CASCADE', //當 images.id 更新時，main_image_id 也會自動更新
      onDelete: 'SET NULL', //當 images 表中的某張圖片被刪除時，Locations.main_image_id 會變成 NULL。
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Locations', 'main_image_id')
  }
};
