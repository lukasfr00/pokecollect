const Pokemon = require("../models/pokemon");
const Type = require("../models/type");
const pokedex = require("../data/pokedex.json");

const seedPokemons = async () => {
  // Abrufen der Typen-IDs
  const types = await Type.find();
  const typeMap = types.reduce((map, type) => {
    map[type.name] = type._id;
    return map;
  }, {});

  // Pokémon-Daten mit Typen-IDs anreichern
  const pokemon = pokedex.map((pokemon) => ({
    ...pokemon,
    primaryType: typeMap[pokemon.primaryType],
    secondaryType: typeMap[pokemon.secondaryType] || null,
  }));

  // Daten in die Datenbank einfügen
  try {
    // Vorhandene Pokémon in der Datenbank abrufen
    const existingPokemon = await Pokemon.find();

    // Filter für neue Pokémon erstellen
    const existingPokemonIds = new Set(existingPokemon.map((p) => p.pokedex));
    const newPokemon = pokemon.filter(
      (pokemon) => !existingPokemonIds.has(pokemon.pokedex)
    );

    if (newPokemon.length > 0) {
      await Pokemon.insertMany(newPokemon);
      console.log("Neue Pokémon erfolgreich hinzugefügt");
    } else {
      console.log("Keine neuen Pokémon zum Hinzufügen gefunden");
    }
  } catch (error) {
    console.error("Fehler beim Hinzufügen von Pokémon:", error);
  }
};

module.exports = seedPokemons;
