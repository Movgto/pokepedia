import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';
import { PokemonData } from '../../model/pokemonData.type';
import { catchError } from 'rxjs';
import { PokemonItemComponent } from '../../components/pokemon-item/pokemon-item.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-pokemons',
  imports: [PokemonItemComponent, PaginationComponent],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss'
})
export class PokemonsComponent implements OnInit {
  pokemonService = inject(PokemonsService)
  pokemonData = signal<PokemonData | null>(null)
  isLoading = signal(true)
  isError = signal(false)  
  pages = signal(1)

  ngOnInit(): void {
    this.pokemonService.getPokemons(this.pokemonService.currentPage())
      .pipe(
        catchError(err => {
          console.log(err)
          this.isLoading.set(false)
          this.isError.set(true)
          throw err
        })
      )
      .subscribe(data => {
        console.log(data)
        this.pokemonService.count.set(data.count)
        this.isLoading.set(false)
        this.isError.set(false)
        this.pokemonData.set(data)
        this.setPages()
      })
  }

  private setPages() {
    if (!this.pokemonData()) return

    const pages = Math.ceil(this.pokemonData()!.count / 20)

    this.pages.set(pages)
  }

  updatePage(page: number) {
    console.log("from updatePage", page)
    this.isLoading.set(true)
    this.isError.set(false)
    this.pokemonService.getPokemons(page)
      .pipe(
        catchError(err => {
          console.log(err)
          this.isLoading.set(false)
          this.isError.set(true)
          throw err
        })
      )
      .subscribe(data => {
        console.log("Reaching the update pokemon page step...")
        console.log(data)
        this.isLoading.set(false)        
        this.pokemonData.set(data)
      })
  }
}
