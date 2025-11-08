import { PokemonListItem } from "@/components/PokemonListItem";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { globalStyles } from "@/constants/styles";
import { useAuth } from "@/context/AuthContext";
import { FlatList } from "react-native";

export default function TeamScreen() {
  const { team } = useAuth();

  return (
    <ProtectedRoute>
      <ThemedView style={globalStyles.container}>
        <ThemedView style={globalStyles.headerContainer}>
          <ThemedText type="title" style={globalStyles.headerTitle}>
            My Team
          </ThemedText>
        </ThemedView>

        <FlatList
          data={team?.pokemons || []}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PokemonListItem
              item={{
                name: item.name,
                url: `https://pokeapi.co/api/v2/pokemon/${item.id}`,
              }}
            />
          )}
          style={{ width: "100%" }}
        />
      </ThemedView>
    </ProtectedRoute>
  );
}
