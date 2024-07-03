import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Pokemon } from '../../../pokemon-struct/pokemon';

@Component({
  selector: 'app-pokemon-collection-element',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-collection-element.component.html',
  styleUrl: './pokemon-collection-element.component.scss',
})
export class PokemonCollectionElementComponent {
  @Input({ required: true }) pokedexNr!: string;
  @Input() pokemon!: any;
  @Input() count!: number;

  @Output() pokemonData = new EventEmitter();

  getDecodedImage(uri: string): string {
    return decodeURI(uri);
  }

  openPokemon() {
    const data = {
      pokedex: this.pokedexNr,
      pokemon: this.pokemon,
      count: this.count,
    };

    this.pokemonData.emit(data);
  }
}
