// models/type.js
const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String, required: true },
  normal: { type: Number, required: true },
  fire: { type: Number, required: true },
  water: { type: Number, required: true },
  electric: { type: Number, required: true },
  grass: { type: Number, required: true },
  ice: { type: Number, required: true },
  fighting: { type: Number, required: true },
  poison: { type: Number, required: true },
  ground: { type: Number, required: true },
  flying: { type: Number, required: true },
  psychic: { type: Number, required: true },
  bug: { type: Number, required: true },
  rock: { type: Number, required: true },
  ghost: { type: Number, required: true },
  dragon: { type: Number, required: true },
  dark: { type: Number, required: true },
  steel: { type: Number, required: true },
});

module.exports = mongoose.model("Type", TypeSchema);
