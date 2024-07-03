// models/pokemon.js
const mongoose = require("mongoose");
const Type = require("./type");

const PokemonSchema = new mongoose.Schema({
  pokedex: { type: String, required: true },
  name: { type: String, required: true },
  sprite: { type: String, required: true },
  rarity: { type: String, required: true },
  primaryType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    required: true,
  },
  secondaryType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Type",
    default: null,
  },
});

module.exports = mongoose.model("Pokemon", PokemonSchema, "pokemon");
