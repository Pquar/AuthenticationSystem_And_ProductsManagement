const express = require('express');
const authMiddleware = require('../middleware/auth');

const Order = require('../models/order');
const Product = require('../models/product');

const router = express.Router();

// productsAllGet
router.get('/', async (req, res) => {
  //res.send({ ok: true, user: req.userId });
  try {
    const products = await Product.find().populate('user');
    return res.send({ products });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading products' });
  }
});
// return product by id;
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate(
      'user'
    );
    return res.send({ product });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading product' });
  }
});


router.get('/:id', async (req, res) => {
  res.send({ user: req.userId});
});
//usa a rota autenticada
router.use(authMiddleware);

//add product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, user: req.userId });

    return res.send({ product });
  } catch (error) {
    return res.status(400).send({ error: 'error criando novo produto ' });
  }
});

// remove product by id
router.delete('/:productId', async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.productId);
    return res.send('removing product');
  } catch (err) {
    return res.status(400).send({ error: 'Error deleting product' });
  }
});

module.exports = (app) => app.use('/products', router);
