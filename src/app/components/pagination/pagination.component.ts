import { Component, inject, input, output, signal } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  pokemonService = inject(PokemonsService)
  pages = input.required<number>()  
  pageToGo = output<number>()

  goToPage(page: number) {
    console.log(page)
    this.pokemonService.currentPage.set(page)
    this.pageToGo.emit(page)
  }
}
