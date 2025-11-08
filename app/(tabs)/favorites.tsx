import { PokemonListItem } from "@/components/PokemonListItem";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/context/AuthContext";
import { FlatList, StyleSheet } from "react-native";

export default function FavoritesScreen() {
  const { favorites } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.headerTitle}>
          Favorites
        </ThemedText>
      </ThemedView>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.pokemonName}
        renderItem={({ item }) => (
          <PokemonListItem
            item={{ name: item.pokemonName, url: item.pokemonUrl }}
          />
        )}
        style={{ width: "100%" }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    gap: 12,
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
  },
});
