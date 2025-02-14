'use strict';
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Order, { foreignKey: 'user_id', as: 'orders' });
      User.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });

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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // 名稱不能為空
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Email 必須唯一
        validate: {
          isEmail: true, // 驗證是否為有效 Email
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 100],
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true, // 圖片為可選欄位
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // 預設值為 false
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true, // 使欄位名稱使用 snake_case（例如 created_at）
    }
  );
  return User;
};
