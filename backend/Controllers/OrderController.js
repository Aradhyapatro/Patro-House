import asyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";

export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems === 0) {
    res.status(400).json({ message: "no order items" });
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    try {
      const placedOrder = await order.save();
      res.status(201).json(placedOrder);
    } catch (error) {
      console.log(error);
    }
  }
});

export const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  res.status(200).json(order);
});
