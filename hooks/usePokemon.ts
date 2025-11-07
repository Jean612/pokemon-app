import { Pokemon } from '@/types/pokemon';
import { useEffect, useState } from 'react';

export function usePokemon() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then((response) => response.json())
            .then((data) => setPokemonList(data.results));
    }, []);

    return { pokemonList };
}