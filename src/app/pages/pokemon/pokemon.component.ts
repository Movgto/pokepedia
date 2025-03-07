import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../model/pokemonData.type';
import { environment } from '../../../environments/environment';
import { PokemonsService } from '../../services/pokemons.service';
import { catchError } from 'rxjs';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";

@Component({
  selector: 'app-pokemon',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent implements OnInit {
  pokemonId = signal<string | null>(null)
  pokemonService = inject(PokemonsService)
  pokemon = signal<Pokemon | null>(null)

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.pokemonId.set(this.route.snapshot.paramMap.get('id'))

    const url = environment.apiBaseURL + 'pokemon/' + this.pokemonId()

    this.pokemonService.getPokemon(url)
      .pipe(
        catchError(err => {
          console.log(err)
          throw err
        })
      )
      .subscribe(data => {
        this.pokemon.set(data)
      })
  }

  goBack() {
    this.router.navigate(['/pokemons'])
  }
}
