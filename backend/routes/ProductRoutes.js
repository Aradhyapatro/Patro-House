import {
  getProducts,
  getProductsById, deleteProductsById, createProduct, UpdateProduct
} from "../Controllers/ProductControllers.js";
import express from "express";
import { protect, isAdmin } from '../middleware/AuthMiddleware.js';
const router = express.Router();

// @desc   gets all the products data
// @access public
// @route    GET /api/products/
router.route("/").get(getProducts)

// @desc   create a product data
// @access public
// @route    Post /api/products/
router.route("/").post(protect, isAdmin, createProduct);

// @desc   edit a products data by id
// @access public
// @route    put /api/products/:id
router.route("/:id").put(protect, isAdmin, UpdateProduct)

// @desc   get a product by the id given in the params
// @access public
// @route  GET /api/products/:id
router.route("/:id").get(getProductsById);

// @desc   delete a product by the id given in the params
// @access private
// @route  delete /api/products/:id
router.route("/:id").delete(protect, isAdmin, deleteProductsById);

export default router;
