'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Comment, { foreignKey: 'userId' })
      User.hasMany(models.Activity, { foreignKey: 'userId' })
      User.hasMany(models.Order, { foreignKey: 'userId' })
      User.belongsToMany(models.User, {
        through: models.Follower,
        as: 'Followers', // 被追蹤者
        foreignKey: 'following_id',
        otherKey: 'follower_id',
      })

      User.belongsToMany(models.User, {
        through: models.Follower,
        as: 'Followings', // 追蹤者
        foreignKey: 'follower_id',
        otherKey: 'following_id',
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
    }
  )
  return User
}
