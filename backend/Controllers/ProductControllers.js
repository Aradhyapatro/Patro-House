import products from "../models/ProductModel.js";
import asyncHandler from "express-async-handler";

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {};

  const count = await products.countDocuments({ ...keyword });
  const productsData = await products.find(keyword).limit(pageSize).skip(pageSize * (page - 1));


  res.json({ productsData, page, pages: Math.ceil(count / pageSize) });
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

const CreateNewReview = asyncHandler(async (req, res) => {

  const { rating, comment } = req.body;

  const product = await products.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

    if (alreadyReviewed) {
      res.status(200);

      throw new Error('Already Reviewed');
    }

    const review = {
      name: req.user.name,
      rate: rating,
      comment: comment,
      user: req.user._id
    }

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, item) => item.rate + acc, 0) / product.reviews.length;
    await product.save();

    res.status(201).json({ msg: "review added" });
  } else {
    res.status(404);
    throw new Error('No Such Product found to be reviewed')
  }
});

const getTopProducts = asyncHandler(async (req, res) => {

  const top = await products.find({}).sort({ rating: -1 }).limit(3)

  if (top) {
    res.status(201).json(top);
  } else {
    res.status(404).json({ msg: "Could not find the top products" })
  }
});

export { getTopProducts, getProducts, getProductsById, deleteProductsById, createProduct, UpdateProduct, CreateNewReview };
