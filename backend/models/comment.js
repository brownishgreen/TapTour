'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'userId' })
      Comment.belongsTo(models.Activity, { foreignKey: 'activityId' })
      Comment.belongsTo(models.Location, { foreignKey: 'locationId' })
      Comment.belongsTo(models.Product, { foreignKey: 'productId' })
    }
  }
  Comment.init(
    {
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      activityId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
      underscored: true,
    }
  )
  return Comment
}
