const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Connection failed: " + error.message);
  }
};

module.exports = connectDB;