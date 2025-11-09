import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

/**
 * @param item The Pokémon data to display.
 */
type PokemonListItemProps = {
  item: { name: string; url: string };
};

/**
 * A component that displays a single Pokémon in a list.
 * It shows the Pokémon's official artwork and its name, and links to the
 * Pokémon's detail page.
 * @param {PokemonListItemProps} props The properties for the component.
 * @returns {JSX.Element} The rendered list item.
 */
export function PokemonListItem({ item }: PokemonListItemProps) {
  const pokemonId = item.url.split("/")[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <Link href={`/pokemon/${pokemonId}`} style={styles.container}>
      <ThemedView style={styles.pokemonItem}>
        <Image source={{ uri: imageUrl }} style={styles.pokemonImage} />
        <ThemedText style={styles.pokemonName}>{item.name}</ThemedText>
      </ThemedView>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
  },
  pokemonItem: {
    padding: 15,
    borderRadius: 18,
    shadowColor: "#f79f9fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  pokemonName: {
    fontSize: 18,
    textTransform: "capitalize",
    fontFamily: "Montserrat-Regular",
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
});
