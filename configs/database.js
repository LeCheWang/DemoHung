const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/demo_hung');

    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

module.exports = connectDB;