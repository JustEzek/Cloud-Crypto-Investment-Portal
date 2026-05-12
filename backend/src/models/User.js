const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    userid: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate: { is: /^[a-zA-Z0-9_]{3,40}$/ }
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password_hash'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    zipcode: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('Customer', 'Employee', 'Admin'),
      allowNull: false,
      defaultValue: 'Customer'
    },
    walletAddress: {
      type: DataTypes.STRING(80),
      field: 'wallet_address',
      validate: { is: /^0x[a-fA-F0-9]{40}$/ }
    }
  },
  {
    tableName: 'users',
    underscored: true
  }
);

module.exports = User;

