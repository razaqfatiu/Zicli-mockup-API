const express = require('express');

const indexRouter = express.Router();

const { signUp, signIn } = require('../controller/auth');
const { auth } = require('../middleware/auth');
const multer = require('../middleware/multer');
const {
  adminAddProduct, adminEditProduct, adminDeleteProduct, getProducts,
} = require('../controller/product');
const { addProductToCart, viewCarts, deleteProductFromCart } = require('../controller/cart');

/**
 * @swagger
 * /auth/signup:
 *  post:
 *   summary: create Users and Admin account
 *   description: Create User Account
 *   tags:
 *       - Users
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             isAdmin:
 *               type: boolean
 *   responses:
 *     201:
 *       description: Account created successfully
 *       schema:
 *         type: object
 *         properties:
 *           status:
 *             type: integer
 *             data:
 *               type: object
 *             default: 'Added'
 */

indexRouter.post('/auth/signup', signUp);
// indexRouter.post('/auth/signup', signUp);
indexRouter.post('/auth/signin', signIn);

indexRouter.get('/products', auth, getProducts);
indexRouter.post('/products', auth, multer, adminAddProduct);
indexRouter.patch('/products/:productId', auth, multer, adminEditProduct);

indexRouter.delete('/products/:productId', auth, adminDeleteProduct);

indexRouter.post('/carts/:productId', auth, addProductToCart);
indexRouter.get('/carts', auth, viewCarts);
indexRouter.delete('/carts/:cartId', auth, deleteProductFromCart);

module.exports = indexRouter;
