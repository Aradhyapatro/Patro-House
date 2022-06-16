import dotenv from "dotenv";
import colors from "colors";
import order from "./models/OrderModel.js";
import product from "./models/ProductModel.js";
import User from "./models/UserModel.js";
import productsData from "./data/products.js";
import usersData from "./data/user.js";
import db from "./config/db.js";

dotenv.config();
db();

const importData = async () => {
  try {
    await order.deleteMany();
    await product.deleteMany();
    await User.deleteMany();

    const users = await User.insertMany(usersData);

    const admin = users[0]._id;
    const products = productsData.map((data) => {
      return { ...data, user: admin };
    });

    await product.insertMany(products);

    console.log(" Data has been Imported ".blue.bgYellow.bold);
  } catch (error) {
    console.log(`${error}`.red.bgGreen);
  }
};

const deleteData = async () => {
  try {
    await order.deleteMany();
    await product.deleteMany();
    await User.deleteMany();

    console.log("Data Deleted".blue.bgYellow.bold);
  } catch (error) {
    console.log(`${error}`.red.bgGreen);
  }
};

if (process.argv[2] == "d") {
  deleteData();
} else {
  importData();
}
