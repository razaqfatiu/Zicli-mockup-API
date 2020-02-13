const { sequelize, Sequelize } = require('../config/db-config');

const Product = sequelize.define('Products', {
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
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fileName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  inStock: {
    type: Sequelize.BOOLEAN,
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
}, {});
Product.associate = (models) => {
  // associations can be defined here
  Product.belongsTo(models.User, { foreignKey: 'userId' });
  Product.hasMany(models.Cart, { foreignKey: 'cartId' });
};
//   return Product;
// };
module.exports = Product;
