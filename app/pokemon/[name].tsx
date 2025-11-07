import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PokemonTypeColors } from '@/constants/PokemonTypes';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, StyleSheet } from 'react-native';

export function generateStaticParams() {
    return [
        { name: 'bulbasaur' },
        { name: 'charmander' },
        { name: 'squirtle' },
    ];
}

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
        <>
            <Stack.Screen
                options={{
                    title: pokemonDetail.name.toUpperCase(),
                    headerStyle: {
                        backgroundColor,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontFamily: 'Montserrat-Bold',
                    },
                }}
            />
        
            <ThemedView style={styles.container}>
                <ThemedView style={[styles.pokemonUpperCard, { shadowColor: backgroundColor }]}>
                    <Image 
                        source={{ uri: pokemonDetail.sprites.other['official-artwork'].front_default }}
                        style={styles.image}
                    />
                </ThemedView>

                <ThemedView style={styles.pokemonMidCard}>
                    <ThemedView style={[styles.orderContainer, { backgroundColor }]}>
                        <ThemedText style={styles.order}># {pokemonDetail.order}</ThemedText>
                    </ThemedView>
                    <ThemedView style={[styles.measuresContainer, { shadowColor: backgroundColor }]}>
                        <ThemedText>{pokemonDetail.weight / 10} kg</ThemedText>
                    </ThemedView>
                    <ThemedView style={[styles.measuresContainer, { shadowColor: backgroundColor }]}>
                        <ThemedText>{pokemonDetail.height / 10} m</ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.pokemonTypesCard}>
                    {
                        pokemonDetail.types.map(typeInfo => (
                            <ThemedView key={typeInfo.type.name} style={[styles.typeBadge, { borderColor: backgroundColor }]}>
                                <ThemedText style={styles.type}>{typeInfo.type.name}</ThemedText>
                            </ThemedView>
                        ))
                    }
                </ThemedView>
                
            </ThemedView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        fontFamily: 'Montserrat-Regular',
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
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20,
        width: '100%',
    },
    pokemonMidCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        marginVertical: 20,
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
    },
    orderContainer: {
        borderRadius: 8,
        padding: 8,
        flex: 2,
        alignItems: 'center',
    },
    order: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Montserrat-Bold',
    },
    measuresContainer: {
        borderRadius: 8,
        padding: 8,
        flex: 1,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    pokemonTypesCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        justifyContent: 'center',
    },
    typeBadge: {
        borderRadius: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderWidth: 1,
    },
});