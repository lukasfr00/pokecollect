import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../../../pokemon-struct/pokemon';
import { TypeBoxComponent } from '../../../../pokemon-components/type-box/type-box.component';

@Component({
  selector: 'app-pokemon-item',
  standalone: true,
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.scss',
  imports: [TypeBoxComponent],
})
export class PokemonItemComponent {
  @Input({ required: true }) pokemon!: Pokemon;

  console = console;

  getDecodedImage(uri: string): string {
    return decodeURI(uri);
  }

  getRarity() {
    if (this.pokemon.rarity === 'common') {
      return 'Gewöhnlich';
    } else if (this.pokemon.rarity === 'uncommon') {
      return 'Unewöhnlich';
    } else if (this.pokemon.rarity === 'rare') {
      return 'Selten';
    } else if (this.pokemon.rarity === 'epic') {
      return 'Episch';
    } else if (this.pokemon.rarity === 'legendary') {
      return 'Legendär';
    } else {
      return 'Undefiniert';
    }
  }
}
