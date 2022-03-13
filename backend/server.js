import dotenv from "dotenv";
import express from "express";
import products from "./data/products.js";
import cors from "cors";
import db from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/ProductRoutes.js";
import { notFound, errorhandler } from "./middleware/ErrorHandlerMiddleware.js";
const app = express();

// middleware
dotenv.config();
app.use(express.json());
app.use(cors());
db();

app.use(notFound);
app.use(errorhandler);

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API End Point Working");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `  API SERVER running ${process.env.NODE_ENVIRONMENT} environment at port = ${process.env.PORT}  `
      .blue.bgYellow.bold
  );
});
