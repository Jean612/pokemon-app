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
export function usePokemonDetail(pokemonId: number) {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(
    null
  );
  const [description, setDescription] = useState<string>("");
  const [genera, setGenera] = useState<string>("");
  const [officialName, setOfficialName] = useState<string>("");
  const [habitat, setHabitat] = useState<string>("");
  const [shape, setShape] = useState<string>("");
  const [generation, setGeneration] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pokemonId) return;

    setLoading(true);

    const pokemonPromise = fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    ).then((response) => response.json());

    const speciesPromise = fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    )
      .then((response) => {
        if (!response.ok) return null;
        return response.json();
      })
      .catch(() => null);

    Promise.all([pokemonPromise, speciesPromise])
      .then(([pokemonData, speciesData]) => {
        setPokemonDetail(pokemonData);

        if (!speciesData) {
          setLoading(false);
          return;
        }

        const flavorText = speciesData.flavor_text_entries.filter(
          (entry: any) => entry.language.name === "en"
        );

        const random = Math.floor(Math.random() * flavorText.length);
        const randomFlavorText = flavorText[random];

        setDescription(randomFlavorText.flavor_text.replace(/\f/g, " ") || "");
        setGenera(
          speciesData.genera.find((gen: any) => gen.language.name === "en")
            ?.genus || ""
        );
        setOfficialName(
          speciesData.names.find((name: any) => name.language.name === "en")
            ?.name || ""
        );

        const promises = [];

        if (speciesData.generation) {
          promises.push(
            fetch(speciesData.generation.url).then((response) =>
              response.json()
            )
          );
        }

        if (speciesData.habitat) {
          promises.push(
            fetch(speciesData.habitat.url).then((response) => response.json())
          );
        }

        if (speciesData.shape) {
          promises.push(
            fetch(speciesData.shape.url).then((response) => response.json())
          );
        }

        Promise.all(promises)
          .then(([generationData, habitatData, shapeData]) => {
            setGeneration(
              generationData?.names.find(
                (name: any) => name.language.name === "en"
              )?.name || ""
            );
            setHabitat(
              habitatData?.names.find(
                (name: any) => name.language.name === "en"
              )?.name || ""
            );
            setShape(
              shapeData?.names.find((name: any) => name.language.name === "en")
                ?.name || ""
            );
          })
          .catch((error) => {
            console.error(error);
          });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      }).finally;
  }, [pokemonId]);

  return {
    pokemonDetail,
    description,
    loading,
    genera,
    officialName,
    habitat,
    shape,
    generation,
  };
}
