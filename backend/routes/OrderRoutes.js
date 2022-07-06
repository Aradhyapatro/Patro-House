import {
  createOrder,
  getOrderByID,
  payForOrderById,
} from "../Controllers/OrderController.js";
import { protect } from "../middleware/AuthMiddleware.js";
import express from "express";
const router = express.Router();

// @desc   Place an order
// @access private
// @route  POST /api/orders
router.route("/").post(protect, createOrder);

// @desc   Get the order Details by id
// @access private
// @route  GET /api/orders/:id
router.route("/:id").get(protect, getOrderByID);

// @desc   Get the order to pay
// @access private
// @route  GET /api/orders/:id/pay
router.route("/:id/pay").get(protect, payForOrderById);

export default router;