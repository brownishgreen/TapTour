"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Categories", [
      {
        id: 1,
        name: "戶外活動",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "美食體驗",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "文化活動",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: "冒險運動",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
