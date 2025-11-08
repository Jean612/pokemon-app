import { BadgeType } from "@/components/BadgeType";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { PokemonTypeColors } from "@/constants/PokemonTypes";
import { useAuth } from "@/context/AuthContext";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

/**
 * The screen for displaying the detailed information of a single Pokémon.
 * It retrieves the Pokémon's name from the route parameters and fetches
 * its details using the `usePokemonDetail` hook.
 * The screen shows the Pokémon's image, order number, weight, height, description,
 * types, abilities, base stats, and moves.
 * A loading indicator is displayed while the data is being fetched.
 * @returns {JSX.Element} The rendered Pokémon detail screen.
 */
export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const {
    pokemonDetail,
    description,
    loading: loadingDetail,
  } = usePokemonDetail(name);

  const {
    favorites,
    addFavorite,
    removeFavorite,
    loading: loadingFavorites,
    session,
  } = useAuth();

  if (loadingDetail || loadingFavorites) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!pokemonDetail) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Pokemon no encontrado</ThemedText>
      </ThemedView>
    );
  }

  const isFavorite = favorites.some(
    (favorite) => favorite.pokemonName === pokemonDetail.name
  );

  const primaryType = pokemonDetail.types[0]?.type
    .name as keyof typeof PokemonTypeColors;
  const backgroundColor = PokemonTypeColors[primaryType] || "#fff";

  const toggleFavorite = () => {
    if (!session) {
      router.push("/login");
    }

    if (isFavorite) {
      removeFavorite(pokemonDetail.name);
    } else {
      addFavorite(
        pokemonDetail.name,
        `https://pokeapi.co/api/v2/pokemon/${pokemonDetail.id}`
      );
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: pokemonDetail.name.toUpperCase(),
          headerStyle: {
            backgroundColor,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Montserrat-Bold",
          },
        }}
      />

      <ThemedView style={styles.wrapper}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <ThemedView
            style={[styles.pokemonUpperCard, { shadowColor: backgroundColor }]}
          >
            <Image
              source={{
                uri: pokemonDetail.sprites.other["official-artwork"]
                  .front_default,
              }}
              style={styles.image}
            />
          </ThemedView>

          <ThemedView style={styles.pokemonSecondaryCard}>
            <ThemedView style={[styles.orderContainer, { backgroundColor }]}>
              <ThemedText style={styles.order}>
                # {pokemonDetail.order}
              </ThemedText>
            </ThemedView>
            <ThemedView
              style={[
                styles.measuresContainer,
                { shadowColor: backgroundColor },
              ]}
            >
              <ThemedText style={{ fontSize: 12 }}>
                {pokemonDetail.weight / 10} kg
              </ThemedText>
            </ThemedView>
            <ThemedView
              style={[
                styles.measuresContainer,
                { shadowColor: backgroundColor },
              ]}
            >
              <ThemedText style={{ fontSize: 12 }}>
                {pokemonDetail.height / 10} m
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.pokemonSecondaryCard}>
            <ThemedView style={styles.descriptionContainer}>
              <ThemedText style={styles.sectionTitle}>Description</ThemedText>
              <ThemedText style={styles.pokemonDescription}>
                {description}
              </ThemedText>
            </ThemedView>
            <Pressable onPress={toggleFavorite} style={styles.favoriteButton}>
              <FontAwesome
                name={isFavorite ? "star" : "star-o"}
                size={25}
                color="#fff"
              />
            </Pressable>
          </ThemedView>

          <ThemedText style={styles.sectionTitle}>Types</ThemedText>
          <ThemedView style={styles.pokemonBadgesContainer}>
            {pokemonDetail.types.map((typeInfo) => (
              <BadgeType key={typeInfo.type.name} name={typeInfo.type.name} />
            ))}
          </ThemedView>

          <ThemedText style={styles.sectionTitle}>Abilities</ThemedText>
          <ThemedView style={styles.pokemonBadgesContainer}>
            {pokemonDetail.abilities.map((abilityInfo) => (
              <ThemedView
                key={abilityInfo.ability?.name}
                style={[styles.typeBadge, { borderColor: backgroundColor }]}
              >
                <ThemedText style={styles.type}>
                  {abilityInfo.ability?.name}
                </ThemedText>
              </ThemedView>
            ))}
          </ThemedView>

          <ThemedText style={styles.sectionTitle}>Base Stats</ThemedText>
          <ThemedView style={styles.pokemonBadgesContainer}>
            {pokemonDetail.stats.map((statInfo) => (
              <ThemedView
                key={statInfo.stat?.name}
                style={[styles.typeBadge, { borderColor: backgroundColor }]}
              >
                <ThemedText style={styles.type}>
                  {statInfo.stat?.name} {statInfo.base_stat}
                </ThemedText>
              </ThemedView>
            ))}
          </ThemedView>

          <ThemedText style={styles.sectionTitle}>Moves</ThemedText>
          <ThemedView style={styles.pokemonBadgesContainer}>
            {pokemonDetail.moves.map((moveInfo) => (
              <ThemedView
                key={moveInfo.move?.name}
                style={[styles.typeBadge, { borderColor: backgroundColor }]}
              >
                <ThemedText style={styles.type}>
                  {moveInfo.move?.name}
                </ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  pokemonUpperCard: {
    borderRadius: 18,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
    width: "100%",
  },
  pokemonSecondaryCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    width: "100%",
    marginVertical: 20,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  typesContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  orderContainer: {
    borderRadius: 8,
    padding: 8,
    flex: 2,
    alignItems: "center",
  },
  order: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Montserrat-Bold",
  },
  measuresContainer: {
    borderRadius: 8,
    padding: 8,
    flex: 1,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pokemonBadgesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  pokemonDescription: {
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    textAlign: "left",
    width: "100%",
  },
  typeBadge: {
    borderRadius: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  type: {
    fontSize: 12,
    textTransform: "capitalize",
    marginHorizontal: 5,
  },
  favoriteButton: {
    backgroundColor: "#fff700c4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: "auto",
    width: 50,
    height: 50,
  },
  descriptionContainer: {
    flex: 3,
  },
});
