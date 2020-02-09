
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Carts', {
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
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Carts'),
};
