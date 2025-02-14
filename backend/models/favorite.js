module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // 確保這是你的 Users 表名稱
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemType: {
      type: DataTypes.ENUM('activity', 'product'),
      allowNull: false
    }
  }, {
    tableName: 'favorites',
    timestamps: true
  });

  // 設定關聯
  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    Favorite.belongsTo(models.Activity, { foreignKey: 'itemId', constraints: false })
    Favorite.belongsTo(models.Product, { foreignKey: 'itemId', constraints: false })
  };

  return Favorite;
};
