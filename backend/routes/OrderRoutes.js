import {
  createOrder,
  getOrderByID,
  payForOrderById, getMyOrders, getOrders, updateOrderToDelivered
} from "../Controllers/OrderController.js";
import { protect, isAdmin } from "../middleware/AuthMiddleware.js";
import express from "express";
const router = express.Router();

// @desc   Place an order
// @access private
// @route  POST /api/orders
router.route("/").post(protect, createOrder);

// @desc   get all orders
// @access private
// @route  POST /api/orders
router.route("/").get(protect, isAdmin, getOrders);

// @desc   Get my Orders List
// @access private
// @route  get /api/orders/getmyOrders
router.route("/getMyOrders").get(protect, getMyOrders);

// @desc   Get the order Details by id
// @access private
// @route  GET /api/orders/:id
router.route("/:id").get(protect, getOrderByID);

// @desc   to deliver by id
// @access private
// @route  PUT /api/orders/:id
router.route("/:id/deliver").get(protect, isAdmin, updateOrderToDelivered);

// @desc   Get the order to pay
// @access private
// @route  GET /api/orders/:id/pay
router.route("/:id/pay").get(payForOrderById);

export default router;
