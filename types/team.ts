export interface Team {
    id: string;
    userId: string;
    pokemons: { name: string; id: string }[];
}