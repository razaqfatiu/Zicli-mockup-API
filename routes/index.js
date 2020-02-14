const express = require('express');

const indexRouter = express.Router();

const { signUp, signIn } = require('../controller/auth');
const { auth } = require('../middleware/auth');
const multer = require('../middleware/multer');
const {
  adminAddProduct, adminEditProduct, adminDeleteProduct, getProducts,
} = require('../controller/product');
const { addProductToCart, viewCarts, deleteProductFromCart } = require('../controller/cart');


indexRouter.post('/auth/signup', signUp);
indexRouter.post('/auth/signin', signIn);

indexRouter.get('/products', auth, getProducts);
indexRouter.post('/products', auth, multer, adminAddProduct);
indexRouter.patch('/products/:productId', auth, multer, adminEditProduct);

indexRouter.delete('/products/:productId', auth, adminDeleteProduct);

indexRouter.post('/carts/:productId', auth, addProductToCart);
indexRouter.get('/carts', auth, viewCarts);
indexRouter.delete('/carts/:cartId', auth, deleteProductFromCart);

module.exports = indexRouter;
