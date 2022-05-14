import products from "../models/ProductModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  const productsData = await products.find({});
  res.json(productsData);
});

const getProductsById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await products.findById(id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error("Page not Found");
  }
});

export { getProducts, getProductsById };
