import dotenv from "dotenv";
import express from "express";
import path from 'path'
import morgan from 'morgan';
import colors from "colors";
import cors from "cors";
import db from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
import userRoute from "./routes/UserRoute.js";
import orderRoute from "./routes/OrderRoutes.js";
import uploadRoute from './routes/UploadRoutes.js'
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
app.use("/api/uploads/", uploadRoute);


app.get("/api/config/paypal", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENVIRONMENT === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get("/", (req, res) => {
    res.send("API is running")
  })
}

if (process.env.NODE_ENVIRONMENT === 'Development') {
  console.log("MOrgen");
  app.use(morgan('common'));
}


// Error Handler middlewares
app.use(notFound);
app.use(errorhandler);

// listening to port
app.listen(process.env.PORT || 5000, () => {
  console.log(
    `  API SERVER running ${process.env.NODE_ENVIRONMENT} environment at port = ${process.env.PORT}  `
      .blue.bgYellow.bold
  );
});
