import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../pokemon-struct/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeBoxComponent } from '../../pokemon-components/type-box/type-box.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [TypeBoxComponent],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const pokemonId = params.get('id')!;
      this.pokemonService.getPokemonById(pokemonId).subscribe((data) => {
        this.pokemon = data;
      });
      console.log(this.pokemon);
    });
  }

  getDecodedImage(uri: string): string {
    return decodeURI(uri);
  }

  goBack() {
    this.router.navigate(['/collection']);
  }
}
