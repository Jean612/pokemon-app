/**
 * Represents the detailed information of a Pokémon.
 */
export interface PokemonDetail {
    /** The Pokémon's ID. */
    id: number;
    /** The Pokémon's name. */
    name: string;
    /** The Pokémon's height in decimetres. */
    height: number;
    /** The Pokémon's weight in hectograms. */
    weight: number;
    /** A list of the Pokémon's types. */
    types: {
        type: {
            name: string;
        }
    }[];
    /** The Pokémon's sprites. */
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    }
    /** The Pokémon's order number. */
    order: number;
    /** A list of the Pokémon's abilities. */
    abilities: {
        ability: {
            name: string;
            url: string;
        }
        is_hidden: boolean;
        slot: number;
    }[];
    /** A list of the Pokémon's base stats. */
    stats: {
        base_stat: number;
        stat: {
            name: string;
            url: string;
        }
    }[];
    /** A list of the Pokémon's moves. */
    moves: {
        move: {
            name: string;
            url: string;
        }
    }[];
}
    