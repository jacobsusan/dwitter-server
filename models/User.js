const crypto = require('crypto');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../database');

class User extends Model {
  static generateSalt() {
    return crypto.randomBytes(16).toString('base64');
  }

  static encryptPassword(plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex');
  }

  isValidPassword(enteredPassword) {
    return (
      User.encryptPassword(enteredPassword, this.salt()) === this.password()
    );
  }
}
const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.init(
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue('password');
      },
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue('salt');
      },
    },
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword,
    },
    sequelize,
    modelName: 'User',
    timestamps: true,
  }
);

module.exports = User;
