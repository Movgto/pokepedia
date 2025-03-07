import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Pokemon, PokemonData } from '../model/pokemonData.type';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  http = inject(HttpClient)
  currentPage = signal(1)
  count = signal(0)

  getPokemons(page?: number) {
    let url = 'https://pokeapi.co/api/v2/pokemon'

    if (page) {
      url += `?limit=20&offset=${page * 20}`
    }

    console.log(url)

    return this.http.get<PokemonData>(url)
  }

  getPokemon(url: string) {
    console.log(url)
    return this.http.get<Pokemon>(url)
  }
}
