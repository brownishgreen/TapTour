'use strict';
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
      User.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });

      User.belongsToMany(models.User, {
        through: models.Follower,
        as: 'Followers', 
        foreignKey: 'following_id',
        otherKey: 'follower_id',
      })
      User.belongsToMany(models.User, {
        through: models.Follower,
        as: 'Followings', 
        foreignKey: 'follower_id',
        otherKey: 'following_id',
      })
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, 
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
          isEmail: true, 
        },
      },
      auth_type: {
        type: DataTypes.ENUM('local', 'google'),
        allowNull: false,
        defaultValue: 'local',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [6, 100],
        },
      },
      google_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true, 
    }
  );
  return User;
};
