'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Follower extends Model {}
  Follower.init(
    {
      follower_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      following_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Follower',
      tableName: 'Followers',
      underscored: true,
    }
  )
  return Follower
}
