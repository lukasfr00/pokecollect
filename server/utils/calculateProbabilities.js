const calculateProbabilities = (availablePokemon, rarityConfig) => {
  const rarityCount = {
    common: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  };

  // Zählen Sie die Anzahl der Karten pro Seltenheitsstufe
  availablePokemon.forEach((pokemon) => {
    rarityCount[pokemon.rarity]++;
  });

  // Berechnen Sie die Wahrscheinlichkeiten basierend auf der Seltenheitsstufe und dem Zusatzfaktor
  availablePokemon.forEach((pokemon) => {
    const rarity = pokemon.rarity;
    const baseProbability = rarityConfig[rarity].baseProbability;
    const multiplier = rarityConfig[rarity].multiplier;
    const count = rarityCount[rarity];

    pokemon.probability = (baseProbability / count) * multiplier;
  });

  return availablePokemon;
};

module.exports = calculateProbabilities;
