import {
  getUser,
  userProfile,
  registerUser,
} from "../Controllers/UserControllers.js";
import { protect } from "../middleware/AuthMiddleware.js";
import express from "express";
const router = express.Router();

// @desc   Register a User
// @access public
// @route  POST /api/users
router.post("/", registerUser);

// @desc   Login User by sAuth user & token
// @access public
// @route  POST /api/users/login
router.post("/login", getUser);

// @desc   Profile Page of User
// @access private
// @route  GET /api/users/profile
router.route("/profile").get(protect, userProfile);

export default router;
