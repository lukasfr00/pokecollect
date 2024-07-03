// controllers/pokemonController.js
const Pokemon = require("../models/pokemon");
const Type = require("../models/type");

// Beispiel-Pokémon-Daten
const fireType = new Type({
  name: "Feuer",
  normal: 1,
  fire: 0.5,
  water: 0.5,
  electric: 1,
  grass: 2,
  ice: 2,
  fighting: 1,
  poison: 1,
  ground: 1,
  flying: 1,
  psychic: 1,
  bug: 2,
  rock: 0.5,
  ghost: 1,
  dragon: 0.5,
  dark: 1,
  steel: 2,
});

const waterType = new Type({
  name: "Wasser",
  normal: 1,
  fire: 2,
  water: 0.5,
  electric: 1,
  grass: 0.5,
  ice: 1,
  fighting: 1,
  poison: 1,
  ground: 2,
  flying: 1,
  psychic: 1,
  bug: 2,
  rock: 2,
  ghost: 1,
  dragon: 0.5,
  dark: 1,
  steel: 1,
});

const grassType = new Type({
  name: "Pflanze",
  normal: 1,
  fire: 0.5,
  water: 2,
  electric: 1,
  grass: 0.5,
  ice: 1,
  fighting: 1,
  poison: 0.5,
  ground: 2,
  flying: 0.5,
  psychic: 1,
  bug: 0.5,
  rock: 2,
  ghost: 1,
  dragon: 0.5,
  dark: 1,
  steel: 0.5,
});

const examplePokemon = [
  {
    id: 1,
    pokedex: "0001",
    name: "Bisasam",
    level: 5,
    minLevel: 1,
    maxLevel: 10,
    primaryType: grassType,
  },
  {
    id: 4,
    pokedex: "0004",
    name: "Glumanda",
    level: 5,
    minLevel: 1,
    maxLevel: 10,
    primaryType: fireType,
  },
  {
    id: 7,
    pokedex: "0007",
    name: "Schiggy",
    level: 5,
    minLevel: 1,
    maxLevel: 10,
    primaryType: waterType,
  },
];

const getAllPokemon = async (req, res) => {
  try {
    // Beispiel: In einer echten App würden Sie Pokémon aus der Datenbank abrufen.
    res.json(examplePokemon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPokemonById = async (req, res) => {
  try {
    const pokemon = examplePokemon.find(
      (p) => p.id === parseInt(req.params.id)
    );
    if (!pokemon)
      return res.status(404).json({ message: "Pokémon nicht gefunden" });
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPokemon,
  getPokemonById,
};
