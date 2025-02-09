'use strict';

const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('12345678', 10),
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: true,
        image: 'http://localhost:3000/uploads/avatars/admin-tank.webp',
        bio: '吾乃冰熊熊覃克，管理員是也，魚與熊掌不可兼得，閣下選魚吧。',
      },
      {
        id: 2,
        name: 'user',
        email: 'user@example.com',
        password: await bcrypt.hash('12345678', 10),
        created_at: new Date(),
        updated_at: new Date(),
        is_admin: false,
        image: 'http://localhost:3000/uploads/avatars/user-igrit.webp',
        bio: '在下伊格利特，生前乃闇影軍團騎士統領，現如今只是一個普通使用者，生性害羞但劍術了得。',
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
