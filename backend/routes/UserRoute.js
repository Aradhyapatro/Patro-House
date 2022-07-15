import {
  getUser,
  userProfile,
  registerUser,
  updateUser,
  getUsers, deleteUser, getUserById
} from "../Controllers/UserControllers.js";
import { protect, isAdmin } from "../middleware/AuthMiddleware.js";
import express from "express";
const router = express.Router();

// @desc   Register a User
// @access public
// @route  POST /api/users
router.route("/").post(registerUser);

// @desc   Login User by Auth user & token
// @access public
// @route  POST /api/users/login
router.route("/login").post(getUser);

// @desc   Profile Page of User
// @access private
// @route  GET /api/users/profile
router.route("/profile").get(protect, userProfile);

// @desc   update the user profile
// @access private
// @route  PUT /api/users/profile
router.route("/profile").put(protect, updateUser);

// @desc   Get all Users
// @access private
// @route  GET /api/users/getUsers
router.route("/getUsers").get(protect, isAdmin, getUsers);

// @desc   Delete User by id
// @access private
// @route  GET /api/users/:id
router.route("/:id").get(protect, isAdmin, deleteUser);

// @desc   Get User by id
// @access private
// @route  GET /api/users/getUsers/:id
router.route("/getUsers/:id").get(protect, isAdmin, getUserById);

export default router;
