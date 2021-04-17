const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../database');

class Reactions extends Model {}

Reactions.init(
  {
    dweetId: {
      type: DataTypes.INTEGER,
      unique: 'actions_unique',
    },
    reactorId: {
      type: DataTypes.INTEGER,
      unique: 'actions_unique',
    },
    reactionType: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Reactions',
    timestamps: true,
  },
  {
    uniqueKeys: {
        actions_unique: {
            fields: ['dweetId', 'reactorId']
        }
    }
  }
);

module.exports = Reactions;
