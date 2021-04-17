const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../database');

class Followers extends Model {}

Followers.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      unique: 'actions_unique_1',
    },
    followerId: {
      type: DataTypes.INTEGER,
      unique: 'actions_unique_1',
    },
  },
  {
    sequelize,
    modelName: 'Followers',
    timestamps: true,
  },
  {
    uniqueKeys: {
      actions_unique_1: {
            fields: ['userId', 'followerId']
        }
    }
  }
);

module.exports = Followers;
