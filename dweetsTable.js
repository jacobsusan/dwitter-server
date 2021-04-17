const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class dweetsTable extends Model {}

dweetsTable.init(
  {
    userName: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    dweetText: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'dweetsTable',
    timestamps: false,
  }
);

module.exports = dweetsTable;
