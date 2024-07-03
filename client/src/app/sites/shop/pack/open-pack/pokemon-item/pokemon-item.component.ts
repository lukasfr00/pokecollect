import { Component, Input } from '@angular/core';
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
}
