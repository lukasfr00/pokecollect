const express = require("express");
const router = express.Router();
const Pokemon = require("../models/pokemon");

// GET alle Pokémon
router.get("/", async (req, res) => {
  try {
    const pokemon = await Pokemon.find()
      .populate("primaryType")
      .populate("secondaryType");
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ein spezifisches Pokémon
router.get("/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id)
      .populate("primaryType")
      .populate("secondaryType");
    if (!pokemon) return res.status(404).json({ message: "Pokémon not found" });
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
