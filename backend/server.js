const express = require("express");
const app = express();
const products = require("./data/products");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API End Point Working");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const item = products.find((element) => element._id === req.params.id);
  res.json(item);
});

app.listen(5000, () => {
  console.log("API SERVER running");
});
