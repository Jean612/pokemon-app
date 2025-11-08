import { Pokeball } from "@/components/Pokeball";
import { PokemonListItem } from "@/components/PokemonListItem";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { globalStyles } from "@/constants/styles";
import { usePokemon } from "@/hooks/usePokemon";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";

/**
 * The Pokédex screen, which displays a list of Pokémon.
 * It features a search bar to filter the list by name and infinite scrolling
 * to load more Pokémon as the user scrolls down.
 * A loading indicator is shown while the initial data is being fetched,
 * and a smaller footer indicator is displayed when loading more Pokémon.
 * @returns {JSX.Element} The rendered Pokédex screen.
 */
export default function PokedexScreen() {
  const { pokemonList, loadMorePokemon, loading, loadingMore } = usePokemon();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <ThemedView style={styles.footer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  };

  if (loading && pokemonList.length === 0) {
    return (
      <ThemedView style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={globalStyles.container}>
      <ThemedView style={globalStyles.headerContainer}>
        <ThemedText type="title" style={globalStyles.headerTitle}>
          Pokédex
        </ThemedText>
        <Pokeball size={28} color="#DC0A2D" />
      </ThemedView>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Pokémon..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredPokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonListItem item={item} />}
        style={styles.list}
        onEndReached={loadMorePokemon}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
  searchInput: {
    width: "90%",
    height: 40,
    borderColor: "#f7b4bfff",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  footer: {
    paddingVertical: 20,
  },
});
