import { PokemonListItem } from "@/components/PokemonListItem";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { globalStyles } from "@/constants/styles";
import { useAuth } from "@/context/AuthContext";
import { FlatList } from "react-native";

export default function FavoritesScreen() {
  const { favorites } = useAuth();

  return (
    <ThemedView style={globalStyles.container}>
      <ThemedView style={globalStyles.headerContainer}>
        <ThemedText type="title" style={globalStyles.headerTitle}>
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
