import { Component, inject, input } from '@angular/core';
import { Pokemon } from '../../model/pokemonData.type';
import { FavsService } from '../../services/favs.service';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  favService = inject(FavsService)
  pokemon = input.required<Pokemon>()

  isFav() {
    return this.favService.checkFav(this.pokemon().id)
  }

  handleAdd() {
    this.favService.addToFavs(this.pokemon())
  }

  handleRemove() {
    this.favService.removeFromFavs(this.pokemon().id)
  }
}
