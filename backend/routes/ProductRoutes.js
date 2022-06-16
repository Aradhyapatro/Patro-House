import {
  getProducts,
  getProductsById,
} from "../Controllers/ProductControllers.js";
import express from "express";
const router = express.Router();

// @desc   gets all the products data
// @access public
// @route    GET /api/products/
router.route("/").get(getProducts);

// @desc   get a product by the id given in the params
// @access public
// @route    GET /api/products/:id
router.route("/:id").get(getProductsById);

export default router;
