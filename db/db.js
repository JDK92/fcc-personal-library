const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (error) {
    throw new Error("Could not connect to DB");
  }
}


module.exports = { connectDB };