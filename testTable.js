const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class testTable extends Model {}

testTable.init(
  {
    username: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'testTable',
    timestamps: false,
  }
);

module.exports = testTable;
