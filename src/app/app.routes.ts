import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'pokemons',        
        loadComponent: () => import('./pages/pokemons/pokemons.component').then(m => m.PokemonsComponent)
    },
    {
        path: 'pokemons/:id',        
        loadComponent: () => import('./pages/pokemon/pokemon.component').then(m => m.PokemonComponent)
    },
    {
        path: 'favs',        
        loadComponent: () => import('./pages/favs/favs.component').then(m => m.FavsComponent)
    },
];
