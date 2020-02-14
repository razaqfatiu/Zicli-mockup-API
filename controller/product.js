const fs = require('fs');
const Product = require('../models/product');

const path = `${__dirname}/media/product-images`;

module.exports = {
  adminAddProduct(req, res) {
    (async () => {
      try {
        if (!req.user.isAdmin) {
          return res.status(401).json({
            status: 401,
            error: 'Only Admins can post Product',
          });
        }
        const {
          name, description, category, price, inStock,
        } = req.body;

        const { file } = req;
        const imageUrl = `${req.protocol}://${req.get('host')}/product-images/${file.filename}`;
        const fileName = file.filename;
        const uploadedBy = req.user.id;
        const newProduct = {
          name, description, category, price, inStock, uploadedBy, imageUrl, fileName,
        };
        const createProduct = await Product.create(newProduct);
        const { dataValues } = createProduct;
        return res.status(201).json({
          status: 201,
          data: {
            name: dataValues.name,
            description: dataValues.description,
            category: dataValues.category,
            price: dataValues.price,
            uploadedBy: req.user.email,
            imageUrl: dataValues.imageUrl,
            filename: dataValues.filename,
            inStock: dataValues.inStock,
          },
        });
      } catch (error) {
        return res.status(500).json({ status: 500, error });
      }
    })();
  },
  adminEditProduct(req, res) {
    (async () => {
      try {
        if (!req.user.isAdmin) {
          return res.status(401).json({
            status: 401,
            error: 'Only Admins can Edit Product',
          });
        }
        const {
          name, description, category, price, inStock,
        } = req.body;
        const { productId } = req.params;
        const { file } = req;
        const fileName = file.filename;
        const imageUrl = `${req.protocol}://${req.get('host')}/product-images/${file.filename}`;
        const uploadedBy = req.user.id;
        const findProduct = await Product.findAll({ where: { productId } });
        if (findProduct.length < 1) {
          return res.status(400).json({ status: 400, error: 'Product Not found' });
        }
        const filN = findProduct[0].dataValues.fileName;
        fs.unlinkSync(`${path}/${filN}`);

        const updatedProduct = {
          name, description, category, price, inStock, uploadedBy, imageUrl, fileName,
        };
        await Product.update(updatedProduct, {
          where: {
            productId,
          },
        });
        return res.status(200).json({
          status: 200,
          message: 'product updated successfully!!!',
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error,
        });
      }
    })();
  },
  adminDeleteProduct(req, res) {
    (async () => {
      try {
        if (!req.user.isAdmin) {
          return res.status(401).json({
            status: 401,
            error: 'Only Admins can delete Product',
          });
        }
        const { productId } = req.params;


        const findProduct = await Product.findAll({ where: { productId } });
        if (findProduct.length < 1) {
          return res.status(400).json({ status: 400, error: 'Product Not found' });
        }
        const filN = findProduct[0].dataValues.fileName;
        fs.unlinkSync(`${path}/${filN}`);

        await Product.destroy({
          where: {
            productId,
          },
        });
        return res.status(200).json({
          status: 200,
          message: 'product deleted successfully!!!',
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error,
        });
      }
    })();
  },
  getProducts(req, res) {
    (async () => {
      try {
        const getProds = await Product.findAll();
        return res.status(200).json({
          status: 200,
          data: {
            products: getProds,
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
