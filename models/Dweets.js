const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../database');

class Dweets extends Model {}

Dweets.init(
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    dweetText: {
      type: DataTypes.STRING,
      notNull: true,
    },
    dweetImg: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Dweets',
    timestamps: true,
  }
);

module.exports = Dweets;
