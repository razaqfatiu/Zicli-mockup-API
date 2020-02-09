module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    uploadedBy: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'userId',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Carts', 'Carts_productId_fkey');
    return queryInterface.dropTable('Products');
  },
};
