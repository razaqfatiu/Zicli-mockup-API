const express = require('express');

const indexRouter = express.Router();

const { signUp, signIn, userInputValidation } = require('../controller/auth');
const { auth } = require('../middleware/auth');
const multer = require('../middleware/multer');
const {
  adminAddProduct,
  adminEditProduct,
  adminDeleteProduct,
  getProducts,
  productInputValidation,
} = require('../controller/product');
const { addProductToCart, viewCarts, deleteProductFromCart } = require('../controller/cart');


indexRouter.post('/auth/signup', userInputValidation, signUp);
indexRouter.post('/auth/signin', signIn);

indexRouter.get('/products', auth, getProducts);

indexRouter.post('/products', auth, productInputValidation, multer, adminAddProduct);
indexRouter.patch('/products/:productId', auth, productInputValidation, multer, adminEditProduct);

indexRouter.delete('/products/:productId', auth, adminDeleteProduct);

indexRouter.post('/carts/:productId', auth, addProductToCart);
indexRouter.get('/carts', auth, viewCarts);
indexRouter.delete('/carts/:cartId', auth, deleteProductFromCart);

module.exports = indexRouter;
