const express = require("express");
const app = express();
const products = require("./data/products");

app.get("/", (req, res) => {
  res.send("API End Point Working");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const data = req.params.id;
  const item = products.find((element) => element._id === data);
  console.log(item);
  res.json(item);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("API SERVER running");
});
