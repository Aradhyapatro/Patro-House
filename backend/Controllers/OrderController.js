import asyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";
import mongoose from "mongoose";
import order from "../models/OrderModel.js";

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
  const id = req.params.id;
  const myOrder = await Order.findById(id).populate("user", "name email");

  if (myOrder) {
    res.json(myOrder);
  } else {
    console.log("Error in getting data");
  }
});

export const payForOrderById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const myOrder = await Order.findById(id);

  if (myOrder) {
    myOrder.ispaid = true;
    myOrder.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
  }

  const updateOrder = myOrder.save();

  if (updateOrder) {
    res.status(200).json(updateOrder);
  } else {
    throw new Error("Could not pay");
  }
});
