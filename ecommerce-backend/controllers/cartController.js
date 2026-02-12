const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });
  res.json(cart);
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).json({ message: 'Product not found' });

  if (product.stock < quantity)
    return res.status(400).json({ message: 'Not enough stock' });

  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });

  cart.items.push({ productId, quantity });
  await cart.save();

  res.status(201).json(cart);
};

exports.removeFromCart = async (req, res) => {
  const cart = await Cart.findOne();
  cart.items = cart.items.filter(
    item => item.productId.toString() !== req.params.productId
  );
  await cart.save();
  res.json(cart);
};
