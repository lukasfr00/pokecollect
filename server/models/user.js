const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  level: { type: Number, required: true },
  xp: { type: Map, required: true },
  pokemonCollection: [
    {
      pokemon: { type: mongoose.Schema.Types.ObjectId, ref: "Pokemon" },
      count: { type: Number, default: 1 },
      level: { type: Number, default: 1 },
    },
  ],
  refreshToken: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
