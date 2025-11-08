import { Pokemon } from '@/types/pokemon';
import { useCallback, useEffect, useState } from 'react';

const POKEMON_PER_PAGE = 20;

/**
 * A custom hook for fetching and managing a list of Pokémon from the PokeAPI.
 * It handles pagination, loading states, and appending new Pokémon to the list.
 * @returns {{
 *  pokemonList: Pokemon[],
 *  loading: boolean,
 *  loadingMore: boolean,
 *  loadMorePokemon: () => void
 * }} An object containing the list of Pokémon, loading states, and a function to load more.
 */
export function usePokemon() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadPokemon = useCallback(async (currentOffset: number) => {
        if (currentOffset >= 1328) {
            setHasMore(false);
            return;
        }

        const isLoadingFirstPage = currentOffset === 0;
        if (isLoadingFirstPage) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${currentOffset}`);
        const data = await response.json();

        setPokemonList( prevList => {
            const existingNames = new Set(prevList.map(pokemon => pokemon.name));
            const newUniquePokemon = data.results.filter((p: Pokemon) => !existingNames.has(p.name));
            return [...prevList, ...newUniquePokemon];
        });
        setOffset(currentOffset + POKEMON_PER_PAGE);
        if (isLoadingFirstPage) {
            setLoading(false);
        } else {
            setLoadingMore(false);
        }
    }, []);

    useEffect(() => {
        loadPokemon(0);
    }, [loadPokemon]);

    const loadMorePokemon = () => {
        if (loading || loadingMore || !hasMore) return;
        loadPokemon(offset);
    };

    return { pokemonList, loading, loadingMore, loadMorePokemon };
}