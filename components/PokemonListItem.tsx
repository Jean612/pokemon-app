import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Pokemon } from '@/types/pokemon';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

type PokemonListItemProps = {
    item: Pokemon;
};

export function PokemonListItem({ item }: PokemonListItemProps) {

    const pokemonId = item.url.split('/')[6];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    
    return(
        <Link href={`/pokemon/${item.name}`} style={styles.container}>
            <ThemedView style={styles.pokemonItem}>
                <Image source={{ uri: imageUrl }} style={styles.pokemonImage} />
                <ThemedText style={styles.pokemonName}>{item.name}</ThemedText>
            </ThemedView>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
    },
    pokemonItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    pokemonName: {
        fontSize: 18,
        textTransform: 'capitalize',
    },
    pokemonImage: {
        width: 50,
        height: 50,
        marginRight: 15
    }
});

    