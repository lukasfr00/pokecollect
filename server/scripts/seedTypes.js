const Type = require("../models/type");
const typeData = require("../data/pokemonTypes.json");

const seedTypes = async () => {
  try {
    const existingTypes = await Type.find();
    if (existingTypes.length > 0) {
      console.log("Pokémon-Typen sind bereits initialisiert.");
      return;
    }

    // Löschen bestehender Typen
    // await Type.deleteMany({});

    // URL-encoding für die icon paths
    const encodedTypeData = typeData.map((type) => {
      return {
        ...type,
        icon: encodeURI(type.icon),
      };
    });

    await Type.insertMany(encodedTypeData);
    console.log("Pokémon-Typen erfolgreich hinzugefügt");
  } catch (error) {
    console.error("Fehler beim Hinzufügen von Pokémon-Typen:", error);
  }
};

module.exports = seedTypes;
