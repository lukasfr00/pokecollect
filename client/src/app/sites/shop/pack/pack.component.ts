import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PackService } from './pack.service';
import { Pack } from '../shop.module';
import { ActivatedRoute } from '@angular/router';
import { OpenPackComponent } from './open-pack/open-pack.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { Router } from '@angular/router';
import { CollectionService } from '../../collection/collection.service';

@Component({
  selector: 'app-pack',
  standalone: true,
  imports: [OpenPackComponent, PokemonItemComponent],
  templateUrl: './pack.component.html',
  styleUrl: './pack.component.scss',
})
export class PackComponent {
  pack!: Pack;

  constructor(
    private packService: PackService,
    private route: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const packId = params.get('id');
      if (packId) {
        this.packService.generatePack(packId).subscribe((data) => {
          this.pack = data;
          console.log(this.pack);
        });
      }
    });
  }

  saveCollection(): void {
    this.collectionService
      .updateCollection(this.pack.content)
      .subscribe((response) => {
        console.log(response.message);
      });
  }

  closePack(): void {
    this.saveCollection();
    this.router.navigate(['/shop']);
  }

  goBack() {
    this.router.navigate(['/shop']);
  }
  /*
  //@Input({ required: true }) pack!: StarterPack;
  isOpenend = false;

  @Output() bought = new EventEmitter();

  buyPack() {
    this.isOpenend = true;
    this.bought.emit(this.pack);
  }

  closePack() {
    this.isOpenend = false;
  }*/
}
