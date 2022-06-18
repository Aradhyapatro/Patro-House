import dotenv from "dotenv";
import express from "express";
import products from "./data/products.js";
import colors from "colors";
import cors from "cors";
import db from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
import userRoute from "./routes/UserRoute.js";
import orderRoute from "./routes/OrderRoutes.js";
import { notFound, errorhandler } from "./middleware/ErrorHandlerMiddleware.js";
const app = express();

// middleware
dotenv.config();
app.use(express.json());
app.use(cors());
db();

// Routes or api-end-points
app.use("/api/products", productRoutes);
app.use("/api/users/", userRoute);
app.use("/api/orders", orderRoute);

// Error Handler middlewares
app.use(notFound);
app.use(errorhandler);

// base api end-point
app.get("/", (req, res) => {
  res.send("API End Point Working");
});

// listening to port
app.listen(process.env.PORT || 5000, () => {
  console.log(
    `  API SERVER running ${process.env.NODE_ENVIRONMENT} environment at port = ${process.env.PORT}  `
      .blue.bgYellow.bold
  );
});
