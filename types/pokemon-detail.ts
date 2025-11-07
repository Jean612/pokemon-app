export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
        type: {
            name: string;
        }
    }[];
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            }
        }
    }
    order: number;
    abilities: {
        ability: {
            name: string;
            url: string;
        }
        is_hidden: boolean;
        slot: number;
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
            url: string;
        }
    }[];
    moves: {
        move: {
            name: string;
            url: string;
        }
    }[];
}
    