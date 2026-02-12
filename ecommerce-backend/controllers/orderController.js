const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const cart = await Cart.findOne().populate('items.productId');
  if (!cart || cart.items.length === 0)
    return res.status(400).json({ message: 'Cart is empty' });

  let total = 0;

  for (let item of cart.items) {
    if (item.productId.stock < item.quantity)
      return res.status(400).json({ message: 'Stock problem detected' });

    item.productId.stock -= item.quantity;
    await item.productId.save();

    total += item.productId.price * item.quantity;
  }

  const order = await Order.create({
    items: cart.items,
    total,
    customerInfo: req.body.customerInfo
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};
