const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Investment = sequelize.define(
  'Investment',
  {
    usdBalance: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      field: 'usd_balance'
    },
    btcBalance: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0,
      field: 'btc_balance'
    },
    ethBalance: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0,
      field: 'eth_balance'
    },
    eurBalance: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      field: 'eur_balance'
    },
    riskLevel: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      allowNull: false,
      defaultValue: 'Medium',
      field: 'risk_level'
    }
  },
  {
    tableName: 'investments',
    underscored: true
  }
);

module.exports = Investment;

