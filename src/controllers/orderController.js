const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

const newOrder = asyncHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get single order
const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
});
module.exports = {
  newOrder,
};
