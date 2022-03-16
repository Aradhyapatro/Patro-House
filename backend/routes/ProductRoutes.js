import express from "express";
import products from "../models/ProductModel.js";
import asyncHandler from "express-async-handler";
const router = express.Router();

// @desc   gets all the products data
// @access public
// @api    GET /api/products/
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const productsData = await products.find({});
    res.json(productsData);
  })
);

// @desc   get a product by the id given in the params
// @access public
// @api    GET /api/products/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    console.log(req.params.id);
    const item = await products.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404);
      throw new Error("Page not Found");
    }
  })
);

export default router;
