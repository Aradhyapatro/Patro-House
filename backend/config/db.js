import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB);

    console.log(`The site is connect to ${conn.connection.host}`.cyan);
  } catch (error) {
    console.log(` Connection error = ${error} `.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
