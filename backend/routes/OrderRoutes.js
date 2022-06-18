import { createOrder } from "../Controllers/OrderController.js";
import { protect } from "../middleware/AuthMiddleware.js";
import express from "express";
const router = express.Router();

// @desc   Place an order
// @access private
// @route  POST /api/orders
router.route("/").post(protect, createOrder);

export default router;
