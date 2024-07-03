import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { TypeBoxComponent } from '../../../../pokemon-components/type-box/type-box.component';
import { Pack } from '../../shop.module';

@Component({
  selector: 'app-open-pack',
  standalone: true,
  templateUrl: './open-pack.component.html',
  styleUrl: './open-pack.component.scss',
  imports: [TypeBoxComponent, PokemonItemComponent],
})
export class OpenPackComponent {
  @Input({ required: true }) pack!: Pack;

  @Output() close = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  closePack() {
    for (let index = 0; index < this.pack.content.length; index++) {
      this.cdr.detectChanges();
    }
    this.close.emit();
  }
}
