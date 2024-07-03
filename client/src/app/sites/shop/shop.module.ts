import { Pokemon } from '../../pokemon-struct/pokemon';

export interface Pack {
  _id: string;
  name: string;
  description: string;
  cover: string;
  price: number;
  packSize: number;
  availablePokemon: Pokemon[];
  content: Pokemon[];
}

/*import {
  Bisasam,
  Glumanda,
  Pikachu,
  Pokemon,
  Rattfratz,
  Schiggy,
  Taubsi,
} from '../../pokemon-struct/pokemon';

interface PackPokemon {
  pokemon: { new (): Pokemon };
  probability: number;
}

export interface Pack {
  name: string;
  description: string;
  cover: string;
  price: number;
  packSize: number;
  availablePokemon: PackPokemon[];
  content: Pokemon[];
}

// Funktion, die eine Instanz einer Klasse erstellt, die als Parameter übergeben wird
function createInstance<T>(
  cls: { new (...args: any[]): T },
  ...args: any[]
): T {
  return new cls(...args);
}

export class StarterPack implements Pack {
  name = 'Starterpack';
  description =
    'Das Starterpack enthält garantiert einen der drei Starter Bisasam, Glumanda oder Schiggy.';
  cover = 'assets/pack-covers/starterpack.png';
  price = 100;
  packSize = 3;
  availablePokemon = [
    {
      pokemon: Bisasam,
      probability: 0.334,
    },
    {
      pokemon: Glumanda,
      probability: 0.334,
    },
    {
      pokemon: Schiggy,
      probability: 0.334,
    },
  ];
  content: Pokemon[] = [];

  constructor() {
    for (let index = 0; index < this.packSize; index++) {
      this.content.push(this.selectPokemon(this.availablePokemon));
    }
  }

  // Funktion, die eine Karte basierend auf deren Wahrscheinlichkeit auswählt
  selectPokemon(availablePokemon: PackPokemon[]): Pokemon {
    const rand = Math.random();
    let cumulativeProbability = 0;

    for (const pkmn of availablePokemon) {
      cumulativeProbability += pkmn.probability;
      if (rand < cumulativeProbability) {
        return new pkmn.pokemon();
      }
    }

    // Sollte eigentlich nie hierhin gelangen, füge dies als Fallback hinzu
    return new availablePokemon[availablePokemon.length - 1].pokemon();
  }
}

export class StandardPackGen1 implements Pack {
  name = 'Standardpack 1.Gen';
  description = 'Dieses Pack ist das Standardpack der 1. Generation.';
  cover = 'assets/pack-covers/starterpack.png';
  price = 100;
  packSize = 5;
  availablePokemon = [
    {
      pokemon: Bisasam,
      probability: 0.05,
    },
    {
      pokemon: Glumanda,
      probability: 0.05,
    },
    {
      pokemon: Schiggy,
      probability: 0.05,
    },
    {
      pokemon: Taubsi,
      probability: 0.3,
    },
    {
      pokemon: Rattfratz,
      probability: 0.3,
    },
    {
      pokemon: Pikachu,
      probability: 0.25,
    },
  ];
  content: Pokemon[] = [];

  constructor() {
    for (let index = 0; index < this.packSize; index++) {
      this.content.push(this.selectPokemon(this.availablePokemon));
    }
  }

  // Funktion, die eine Karte basierend auf deren Wahrscheinlichkeit auswählt
  selectPokemon(availablePokemon: PackPokemon[]): Pokemon {
    const rand = Math.random();
    //console.log(rand);
    let cumulativeProbability = 0;

    for (const pkmn of availablePokemon) {
      cumulativeProbability += pkmn.probability;
      if (rand < cumulativeProbability) {
        return new pkmn.pokemon();
      }
    }

    // Sollte eigentlich nie hierhin gelangen, füge dies als Fallback hinzu
    return new availablePokemon[availablePokemon.length - 1].pokemon();
  }
}
*/
