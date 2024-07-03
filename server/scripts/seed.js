const mongoose = require("mongoose");
const connectDB = require("../config/database");
const seedTypes = require("./seedTypes");
const seedPokemon = require("./seedPokemon");
const seedPacks = require("./seedPacks");

const seedDatabase = async () => {
  await connectDB(); // Datenbankverbindung herstellen

  try {
    // Seed-Typen
    await seedTypes();

    // Seed-Pokémon
    await seedPokemon();

    // Seed-Packs
    await seedPacks();
  } catch (error) {
    console.error("Fehler beim Seeding der Datenbank:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
