import { Injectable, signal } from '@angular/core';
import { Pokemon } from '../model/pokemonData.type';

@Injectable({
  providedIn: 'root'
})
export class FavsService {
  pokemonFavs = signal<Pokemon[]>([])

  constructor() {
    const pokeFavsStr = localStorage.getItem('pokeFavs')

    console.log(pokeFavsStr)

    if (pokeFavsStr) {
      const pokeFavs: Pokemon[] = JSON.parse(pokeFavsStr)

      this.pokemonFavs.set(pokeFavs)
    }
  }

  addToFavs(pok: Pokemon) {
    if(this.pokemonFavs().find(p => p.id === pok.id)) return

    this.pokemonFavs.update(data => {
      return [...data, pok]
    })

    this.saveFavs()
  }

  removeFromFavs(id: number) {
    this.pokemonFavs.update(data => data.filter(p => p.id !== id))

    this.saveFavs()
  }

  checkFav(id: number) {
    return this.pokemonFavs().findIndex(p => p.id === id) >= 0
  }

  saveFavs() {
    const favsStr = JSON.stringify(this.pokemonFavs())
    localStorage.setItem('pokeFavs', favsStr)
  }
}
