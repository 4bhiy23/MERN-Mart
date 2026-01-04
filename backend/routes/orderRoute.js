const express = require('express')
const router = express.Router()
const orderModel = require('../models/orderModel');
const { orderConfirmation } = require('../controllers/mailController');

router.post("/", async (req, res) => {
  try {
    const { cartItems, totalAmount } = req.body;
    const user =  req.user.id;


    const items = cartItems.map(e => ({
      product: e.product._id,
      quantity: e.quantity,
      price: e.product.price * e.quantity,
    }));

    const order = await orderModel.create({
      user,
      items,
      totalAmount,
    });

    await orderConfirmation(order, req.user)
    
    return res.json({
      message: "Order placed successfully",
      orderId: order._id,
    });

  } catch (error) {
    console.error("ORDER CREATE ERROR:", error);
    return res.json({ message: error.message });
  }
});


router.get("/" , async (req , res) => {
  const userOrders = await orderModel.find({user : req.user.id}).populate("items.product")
  res.send(userOrders)
})

module.exports = router