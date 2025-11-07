import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PokemonTypeColors } from '@/constants/PokemonTypes';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, StyleSheet } from 'react-native';

export default function PokemonDetailScreen() {
    const { name } = useLocalSearchParams<{ name: string }>();
    const { pokemonDetail, loading } = usePokemonDetail(name);

    if (loading) {
        return (
            <ThemedView style={styles.container}>
                <ActivityIndicator size="large" />
            </ThemedView>
        )
    }

    if (!pokemonDetail) {
        return (
            <ThemedView style={styles.container}>
                <ThemedText>Pokemon no encontrado</ThemedText>
            </ThemedView>
        )
    }

    const primaryType = pokemonDetail.types[0]?.type.name as keyof typeof PokemonTypeColors;
    const backgroundColor = PokemonTypeColors[primaryType] || '#fff';

    return (
        <ThemedView style={[styles.container, { backgroundColor }]}>
            <Image 
                source={{ uri: pokemonDetail.sprites.other['official-artwork'].front_default }}
                style={styles.image}
            />
            <ThemedText type="title" style={styles.name}>{pokemonDetail.name}</ThemedText>
            
            <ThemedView style={styles.infoContainer}>
                <ThemedText type="subtitle">Peso: {pokemonDetail.weight / 10} kg</ThemedText>
                <ThemedText type="subtitle">Altura: {pokemonDetail.height / 10} m</ThemedText>
            </ThemedView>

            <ThemedView style={styles.typesContainer}>
                <ThemedText type="subtitle">Tipos:</ThemedText>
                {
                    pokemonDetail.types.map(typeInfo => (
                        <ThemedText key={typeInfo.type.name} style={styles.type}>{typeInfo.type.name}</ThemedText>
                    ))
                }
            </ThemedView>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    name: {
        textTransform: 'capitalize',
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
    infoContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    typesContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    type: {
        fontSize: 16,
        textTransform: 'capitalize',
        marginHorizontal: 5,
    }
});