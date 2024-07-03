function getRandomPokemon(availablePokemon, excludedIndices) {
  const totalProbability = availablePokemon.reduce((sum, p, index) => {
    if (excludedIndices.includes(index)) return sum;
    return sum + p.probability;
  }, 0);
  const randomValue = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const [index, { pokemon, probability }] of availablePokemon.entries()) {
    if (excludedIndices.includes(index)) continue;
    cumulativeProbability += probability;
    if (randomValue < cumulativeProbability) {
      return { pokemon, index };
    }
  }

  const lastIndex = availablePokemon.length - 1;
  return { pokemon: availablePokemon[lastIndex].pokemon, index: lastIndex }; // Fallback, sollte nie erreicht werden
}

function generatePack(packDefinition) {
  const pack = [];
  const rarityCount = {
    rare: 0,
    epic: 0,
    legendary: 0,
  };
  const excludedIndices = [];

  for (let i = 0; i < packDefinition.packSize; i++) {
    let selectedPokemonData = getRandomPokemon(
      packDefinition.availablePokemon,
      excludedIndices
    );
    let { pokemon, index } = selectedPokemonData;
    let rarity = pokemon.rarity;

    // Check rarity limits
    if (
      rarity === "legendary" &&
      rarityCount.legendary >= packDefinition.maxLegendary
    ) {
      excludedIndices.push(index);
      i--; // Repeat this iteration
      continue;
    } else if (
      rarity === "epic" &&
      rarityCount.epic >= packDefinition.maxEpic
    ) {
      excludedIndices.push(index);
      i--; // Repeat this iteration
      continue;
    } else if (
      rarity === "rare" &&
      rarityCount.rare >= packDefinition.maxRare
    ) {
      excludedIndices.push(index);
      i--; // Repeat this iteration
      continue;
    }

    pack.push(pokemon);
    if (rarity !== "common" && rarity !== "uncommon") rarityCount[rarity]++;
  }

  return pack;
}

module.exports = { generatePack };
