const express = require('express');
const authMiddleware = require('../middleware/auth');

const Order = require('../models/order');

const router = express.Router();


//usa a rota autenticada
router.use(authMiddleware);

//add Order
router.post('/', async (req, res) => {
    try {
      const order = await Order.create({ ...req.body, user: req.userId });
  
      return res.send({ order });
    } catch (error) {
      return res.status(400).send({ error: 'error create Order ' });
    }
  });

  module.exports = (app) => app.use('/order', router);
