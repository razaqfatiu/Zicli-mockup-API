
const { sequelize, Sequelize } = require('../config/db-config');

const Cart = sequelize.define('Carts', {
  cartId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'productId',
    },
    onDelete: 'CASCADE',
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',
      key: 'userId',
    },
    onDelete: 'CASCADE',
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
Cart.associate = (models) => {
  // associations can be defined here
  Cart.belongsTo(models.Product, { foreignKey: 'productId' });
  Cart.belongsTo(models.User, { foreignKey: 'userId' });
};

module.exports = Cart;
