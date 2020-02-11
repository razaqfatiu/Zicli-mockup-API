
const { sequelize, Sequelize } = require('../config/db-config');

const User = sequelize.define('Users', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW(),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
}, {});
User.associate = (models) => {
  // associations can be defined here
  User.hasMany(models.Product, { foreignKey: 'productId' });
  User.hasMany(models.Cart, { foreignKey: 'cartId' });
};

module.exports = User;
