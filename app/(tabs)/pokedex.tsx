import { PokemonListItem } from '@/components/PokemonListItem';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { usePokemon } from '@/hooks/usePokemon';
import { useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';

export default function PokedexScreen() {
  const { pokemonList } = usePokemon();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Mi Pokédex</ThemedText>

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
  list: {
    width: '100%',
  },
  searchInput: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});