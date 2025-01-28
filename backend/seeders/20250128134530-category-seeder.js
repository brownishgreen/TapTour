"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "戶外活動",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "美食體驗",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "文化活動",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
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
