import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../pokemon-struct/pokemon';
import { PokemonCollectionElementComponent } from './pokemon-collection-element/pokemon-collection-element.component';
import { CollectionService } from './collection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  standalone: true,
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  imports: [PokemonCollectionElementComponent],
})
export class CollectionComponent implements OnInit {
  allPokemon: any[] = [];
  userCollection: any[] = [];

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllPokemon();
    this.loadUserCollection();
  }

  loadAllPokemon(): void {
    this.collectionService.getAllPokemon().subscribe(
      (data: any) => {
        this.allPokemon = this.sortPokemonByPokedex(data);
      },
      (error) => {
        console.error('Fehler beim Abrufen aller Pokémon:', error);
      }
    );
  }

  loadUserCollection(): void {
    this.collectionService.getCollection().subscribe(
      (data: any) => {
        this.userCollection = data;
      },
      (error) => {
        console.error('Fehler beim Abrufen der Sammlung:', error);
      }
    );
  }

  sortPokemonByPokedex(pokemonCollection: any[]): any[] {
    return pokemonCollection.sort((a, b) => {
      const pokedexA = parseInt(a.pokedex, 10);
      const pokedexB = parseInt(b.pokedex, 10);
      return pokedexA - pokedexB;
    });
  }

  isCollected(pokemonId: string): boolean {
    return this.userCollection.some((p) => p.pokemon._id === pokemonId);
  }

  getCount(pokemon: any): number {
    const collectedPokemon = this.userCollection.find(
      (p) => p.pokemon._id === pokemon._id
    );
    return collectedPokemon ? collectedPokemon.count : 0;
  }

  goToDetail(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }
}
