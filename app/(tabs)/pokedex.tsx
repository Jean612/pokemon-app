import { PokemonListItem } from '@/components/PokemonListItem';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { usePokemon } from '@/hooks/usePokemon';
import { FlatList, StyleSheet } from 'react-native';

export default function PokedexScreen() {
  const { pokemonList } = usePokemon();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Mi Pokédex</ThemedText>

      <FlatList 
        data={pokemonList}
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
    marginTop: 20,
  },
});