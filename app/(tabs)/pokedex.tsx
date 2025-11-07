import { Pokeball } from '@/components/Pokeball';
import { PokemonListItem } from '@/components/PokemonListItem';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { usePokemon } from '@/hooks/usePokemon';
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';

export default function PokedexScreen() {
  const { pokemonList, loadMorePokemon, loading, loadingMore } = usePokemon();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPokemonList = pokemonList.filter(pokemon =>
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
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <Pokeball size={28} color="#DC0A2D" />
        <ThemedText type="title" style={styles.headerTitle}>Pokédex</ThemedText>
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
        renderItem={({item}) => <PokemonListItem item={item} />}
        style={styles.list}
        onEndReached={loadMorePokemon}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    gap: 12,
    marginVertical: 20,
  },
  list: {
    width: '100%',
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderColor: '#f7b4bfff',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  footer: {
    paddingVertical: 20,
  },
});