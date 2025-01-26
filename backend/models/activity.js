'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Activity.hasMany(models.Comment, { foreignKey: 'activityId' })
      Activity.belongsTo(models.Location, { foreignKey: 'locationId' })
      Activity.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Activity.belongsTo(models.User, { foreignKey: 'userId' })
      Activity.hasMany(models.Image, { foreignKey: 'activityId' })
    }
  }
  Activity.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      time: DataTypes.TIME,
      venue: DataTypes.STRING,
      price: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Activity',
      tableName: 'Activities',
      underscored: true,
    }
  )
  return Activity
}

