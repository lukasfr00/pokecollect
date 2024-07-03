const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Pack = require("../models/Pack");
const Pokemon = require("../models/pokemon");
const packsDataFile = path.join(__dirname, "../data/packs.json");
const rarityConfig = require("../config/rarityConfig");
const calculateProbabilities = require("../utils/calculateProbabilities");

const seedPacks = async () => {
  try {
    // Löschen bestehender Packs
    await Pack.deleteMany({});

    const packData = JSON.parse(fs.readFileSync(packsDataFile, "utf-8"));

    for (const pack of packData) {
      // Holen Sie sich alle Pokemon-Daten für die verfügbaren Pokemon in diesem Pack
      const pokedexNumbers = pack.availablePokemon.map((p) => p.pokedex);
      const availablePokemon = await Pokemon.find({
        pokedex: { $in: pokedexNumbers },
      });

      // Berechnen Sie die Wahrscheinlichkeiten
      const calculatedPokemon = calculateProbabilities(
        availablePokemon,
        rarityConfig
      );

      // Aktualisieren Sie pack.availablePokemon mit den richtigen IDs und Wahrscheinlichkeiten
      pack.availablePokemon = calculatedPokemon.map((pokemon) => ({
        pokemon: pokemon._id, // Setzen Sie hier die richtige ID
        probability: pokemon.probability,
      }));
    }

    // Pokémon IDs zu ObjectIds konvertieren
    /*for (const pack of packData) {
      for (const available of pack.availablePokemon) {
        const pokemon = await Pokemon.findOne({ pokedex: available.pokedex });
        if (pokemon) {
          available.pokemon = pokemon._id;
        } else {
          console.error(
            `Pokémon mit Pokedex-ID ${available.pokedex} nicht gefunden.`
          );
        }
      }
    }*/

    // Packs einfügen
    await Pack.insertMany(packData);
    console.log("Packs erfolgreich hinzugefügt");
  } catch (error) {
    console.error("Fehler beim Hinzufügen von Packs:", error);
  }
};

module.exports = seedPacks;
