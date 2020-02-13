const Cart = require('../models/cart');
const Product = require('../models/product');

module.exports = {
  addProductToCart(req, res) {
    (async () => {
      try {
        const { productId } = req.params;
        const userId = req.user.id;
        const checkProductId = await Product.findAll({ where: { productId } });
        if (checkProductId.length < 1) {
          return res.status(404).json({ status: 404, error: 'Product not found' });
        }
        const createCart = await Cart.create({ productId, userId });
        const { dataValues } = createCart;
        return res.status(201).json({
          status: 201,
          data: {
            cartId: dataValues.cartId,
            userId: dataValues.userId,
            productId: dataValues.productId,
          },
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error,
        });
      }
    })();
  },
  viewCarts(req, res) {
    (async () => {
      try {
        const userId = req.user.id;
        const getUserCart = await Cart.findAll({ where: { userId } });
        return res.status(200).json({
          status: 200,
          data: getUserCart,
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error,
        });
      }
    })();
  },
  deleteProductFromCart(req, res) {
    (async () => {
      try {
        const { cartId } = req.params;
        const userId = req.user.id;
        const checkIfItemIsInCart = await Cart.findAll({ where: { cartId } });
        if (checkIfItemIsInCart.length < 1) {
          return res.status(404).json({
            status: 404,
            error: 'Cart item not found',
          });
        }
        if (checkIfItemIsInCart[0].dataValues.userId !== userId
             && !req.user.isAdmin) {
          return res.status(401).json({ status: 401, error: 'You are unauthorized to delete item' });
        }
        await Cart.destroy({ where: { cartId } });
        return res.status(200).json({
          status: 200,
          message: 'item deleted success!!!',
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error,
        });
      }
    })();
  },
};
