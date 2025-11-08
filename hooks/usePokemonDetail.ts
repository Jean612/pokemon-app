import { PokemonDetail } from "@/types/pokemon-detail";
import { useEffect, useState } from "react";

/**
 * A custom hook for fetching detailed information about a specific Pokémon.
 * It fetches both the Pokémon's main data and its species data to get a description.
 * @param {string} name - The name of the Pokémon to fetch.
 * @returns {{
 *  pokemonDetail: PokemonDetail | null,
 *  description: string,
 *  loading: boolean
 * }} An object containing the Pokémon's details, its description, and a loading state.
 */
export function usePokemonDetail(name: string) {
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!name) return;

        setLoading(true);

        const pokemonPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => response.json());

        const speciesPromise = fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
            .then(response => response.json());

        Promise.all([pokemonPromise, speciesPromise])
            .then(([pokemonData, speciesData]) => {
                setPokemonDetail(pokemonData);

                const flavorText = speciesData.flavor_text_entries.find(
                    (entry: any) => entry.language.name === 'es'
                );

                setDescription(flavorText?.flavor_text.replace(/\f/g, ' ') || '');
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [name]);

    return { pokemonDetail, description, loading };
}