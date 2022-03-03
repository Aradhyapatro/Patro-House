import dotenv from "dotenv";
import express from "express";
import products from "./data/products.js";
import cors from "cors";
import db from "./config/db.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
db();

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

app.post("/testing", () => {
  console.log("Testing successfull");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `API SERVER running ${process.env.NODE_ENVIRONMENT} environment at port = ${process.env.PORT}`
  );
});
