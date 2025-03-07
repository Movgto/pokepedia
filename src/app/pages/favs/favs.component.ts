import { Component, inject } from '@angular/core';
import { FavsService } from '../../services/favs.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-favs',
  imports: [PokemonCardComponent],
  templateUrl: './favs.component.html',
  styleUrl: './favs.component.scss'
})
export class FavsComponent {
  favService = inject(FavsService)
  pokemonFavs = this.favService.pokemonFavs
}
