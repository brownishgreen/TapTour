module.exports = {
  up: async (queryInterface, Sequelize) => {
    const isProduction = process.env.NODE_ENV === 'production'
    await queryInterface.createTable('Favorites', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        ...(isProduction ? {} : {
          references: {
            model: 'Users', 
            key: 'id'
          },
        }),
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
        
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      item_type: {
        type: Sequelize.ENUM('activity', 'product'),
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Favorites');
  }
};
