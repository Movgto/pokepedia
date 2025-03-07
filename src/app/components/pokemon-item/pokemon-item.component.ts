import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { Pokemon } from '../../model/pokemonData.type';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pokemon-item',
  imports: [],
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.scss'
})
export class PokemonItemComponent implements OnInit {
  pokemonService = inject(PokemonsService)
  pokemonURL = input.required<string>()
  pokemon = signal<Pokemon | null>(null)
  apiURL = environment.apiBaseURL
  isLoading = signal(true)
  isError = signal(false)

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.pokemonService.getPokemon(this.pokemonURL())
      .pipe(
        catchError(err => {
          console.log(err)
          this.isLoading.set(false)
          this.isError.set(true)
          throw err
        })
      )
      .subscribe(data => {        
        this.isError.set(false)
        this.isLoading.set(false)
        this.pokemon.set(data)
      })
  }

  onClick() {
    this.route.navigate(['/pokemons', this.pokemon()?.id])
  }
}
