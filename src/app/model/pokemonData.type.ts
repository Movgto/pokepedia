type PokemonPreview = {
    name: string
    url: string
}

export type PokemonData = {
    count: number
    results: PokemonPreview[]
}

export type Pokemon = {
    id: number
    species: {
        name: string
    }
    types: {
        type: {
            name: string
        }
    }[]
    sprites: {
        front_default: string
    }
    weight: number
    height: number
}