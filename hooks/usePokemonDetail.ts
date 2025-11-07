import { PokemonDetail } from "@/types/pokemon-detail";
import { useEffect, useState } from "react";

export function usePokemonDetail(name: string) {
    const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!name) return;

        setLoading(true);

        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((response) => response.json())
            .then(data => {
                setPokemonDetail(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [name]);

    return { pokemonDetail, loading };
}