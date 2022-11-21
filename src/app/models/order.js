const mongoose = require('../../database');

const OrderSchema = new mongoose.Schema({
  products: [
    {
        id: Number,
        name: String,
        description: String,
        stocks: Number,
        price: Number
    },
  ],
  pix_card_number: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
