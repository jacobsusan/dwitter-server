const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../database');

class Comments extends Model {}

Comments.init(
  {
    dweetId: {
      type: DataTypes.INTEGER,
    },
    commenterId: {
      type: DataTypes.INTEGER,
    },
    commentText: {
      type: DataTypes.STRING,
      notNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Comments',
    timestamps: true,
  }
);

module.exports = Comments;
