// config/database.js
const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://root:xfGjmPxiKSo5iAKT@pokemonapp-dev.rtjq4rm.mongodb.net/?retryWrites=true&w=majority&appName=PokemonApp-Dev";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
