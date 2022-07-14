import {
  createOrder,
  getOrderByID,
  payForOrderById, getMyOrders
} from "../Controllers/OrderController.js";
import { protect } from "../middleware/AuthMiddleware.js";
import express from "express";
const router = express.Router();

// @desc   Place an order
// @access private
// @route  POST /api/orders
router.route("/").post(protect, createOrder);

// @desc   Get my Orders
// @access private
// @route  GET /api/orders/myOrders
router.route("/myOrders").get(protect, getMyOrders);

// @desc   Get the order Details by id
// @access private
// @route  GET /api/orders/:id
router.route("/:id").get(protect, getOrderByID);

// @desc   Get the order to pay
// @access private
// @route  GET /api/orders/:id/pay
router.route("/:id/pay").get(payForOrderById);

export default router;
