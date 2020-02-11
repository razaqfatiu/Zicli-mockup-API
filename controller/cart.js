const Cart = require('../models/cart');

module.exports = {
  addProductToCart(req, res) {
    (async () => {
      try {
        const { productId } = req.params;
        const userId = req.user.id;
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
};
