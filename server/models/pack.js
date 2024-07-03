const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String, required: true },
  price: { type: Number, required: true },
  packSize: { type: Number, required: true },
  maxRare: { type: Number, required: true },
  maxEpic: { type: Number, required: true },
  maxLegendary: { type: Number, required: true },
  availablePokemon: [
    {
      pokemon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pokemon",
        required: true,
      },
      probability: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Pack", PackSchema);
