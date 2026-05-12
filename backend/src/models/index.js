const sequelize = require('../config/database');
const User = require('./User');
const Investment = require('./Investment');

User.hasOne(Investment, { foreignKey: 'user_id', as: 'investment' });
Investment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  sequelize,
  User,
  Investment
};

