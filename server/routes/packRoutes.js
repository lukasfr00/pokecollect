const express = require("express");
const router = express.Router();
const Pack = require("../models/Pack");
const { generatePack } = require("../utils/randomSelection");

// GET alle Packs
router.get("/", async (req, res) => {
  try {
    const packs = await Pack.find().populate({
      path: "availablePokemon.pokemon",
      populate: { path: "primaryType secondaryType" },
    });
    res.json(packs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ein spezifisches Pack
router.get("/:id", async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id).populate({
      path: "availablePokemon.pokemon",
      populate: { path: "primaryType secondaryType" },
    });
    if (!pack) return res.status(404).json({ message: "Pack not found" });
    res.json(pack);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET zum Generieren eines zufälligen Packs
router.get("/:id/generate", async (req, res) => {
  try {
    const packDefinition = await Pack.findById(req.params.id).populate({
      path: "availablePokemon.pokemon",
      populate: { path: "primaryType secondaryType" },
    });
    if (!packDefinition)
      return res.status(404).json({ message: "Pack not found" });

    const generatedContent = generatePack(packDefinition);
    const fullPack = {
      ...packDefinition.toObject(),
      content: generatedContent,
    };

    res.json(fullPack);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
