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

const deleteProductsById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const item = await products.findById(id);

  if (item) {
    await item.remove();
    res.json({ msg: 'Product removed' })
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

const createProduct = asyncHandler(async (req, res) => {

  const item = new products({
    name: "sample",
    price: 10,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 2,
    numReviews: 0,
    description: 'sample description',
    rating: 0
  });

  const createdProduct = await item.save();

  res.status(200).json(createdProduct);
});

const UpdateProduct = asyncHandler(async (req, res) => {

  const {
    name, price, description, image, brand, category, countInStock
  } = req.body;

  const product = await products.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    product.save();
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error('No Such Product')
  }
});

export { getProducts, getProductsById, deleteProductsById, createProduct, UpdateProduct };
