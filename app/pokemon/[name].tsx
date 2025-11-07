import { BadgeType } from '@/components/BadgeType';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PokemonTypeColors } from '@/constants/PokemonTypes';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

export function generateStaticParams() {
    return [
        { name: 'bulbasaur' },
        { name: 'charmander' },
        { name: 'squirtle' },
    ];
}

export default function PokemonDetailScreen() {
    const { name } = useLocalSearchParams<{ name: string }>();
    const { pokemonDetail, loading, description } = usePokemonDetail(name);

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

            <ThemedView style={styles.wrapper}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <ThemedView style={[styles.pokemonUpperCard, { shadowColor: backgroundColor }]}>
                    <Image
                        source={{ uri: pokemonDetail.sprites.other['official-artwork'].front_default }}
                        style={styles.image}
                    />
                </ThemedView>

                <ThemedView style={styles.pokemonSecondaryCard}>
                    <ThemedView style={[styles.orderContainer, { backgroundColor }]}>
                        <ThemedText style={styles.order}># {pokemonDetail.order}</ThemedText>
                    </ThemedView>
                    <ThemedView style={[styles.measuresContainer, { shadowColor: backgroundColor }]}>
                        <ThemedText style={{ fontSize: 12 }}>{pokemonDetail.weight / 10} kg</ThemedText>
                    </ThemedView>
                    <ThemedView style={[styles.measuresContainer, { shadowColor: backgroundColor }]}>
                        <ThemedText style={{ fontSize: 12 }}>{pokemonDetail.height / 10} m</ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedText style={styles.sectionTitle}>Description</ThemedText>
                <ThemedText style={styles.pokemonDescription}>{description}</ThemedText>

                <ThemedText style={styles.sectionTitle}>Types</ThemedText>
                <ThemedView style={styles.pokemonBadgesContainer}>
                    {
                        pokemonDetail.types.map(typeInfo => (
                            <BadgeType key={typeInfo.type.name} name={typeInfo.type.name} />
                        ))
                    }
                </ThemedView>

                <ThemedText style={styles.sectionTitle}>Abilities</ThemedText>
                <ThemedView style={styles.pokemonBadgesContainer}>
                    {
                        pokemonDetail.abilities.map(abilityInfo => (
                            <ThemedView key={abilityInfo.ability?.name} style={[styles.typeBadge, { borderColor: backgroundColor }]}>
                                <ThemedText style={styles.type}>{abilityInfo.ability?.name}</ThemedText>
                            </ThemedView>
                        ))
                    }
                </ThemedView>

                <ThemedText style={styles.sectionTitle}>Base Stats</ThemedText>
                <ThemedView style={styles.pokemonBadgesContainer}>
                    {
                        pokemonDetail.stats.map(statInfo => (
                            <ThemedView key={statInfo.stat?.name} style={[styles.typeBadge, { borderColor: backgroundColor }]}>
                                <ThemedText style={styles.type}>{statInfo.stat?.name} {statInfo.base_stat}</ThemedText>
                            </ThemedView>
                        ))
                    }
                </ThemedView>

                <ThemedText style={styles.sectionTitle}>Moves</ThemedText>
                <ThemedView style={styles.pokemonBadgesContainer}>
                    {
                        pokemonDetail.moves.map(moveInfo => (
                            <ThemedView key={moveInfo.move?.name} style={[styles.typeBadge, { borderColor: backgroundColor }]}>
                                <ThemedText style={styles.type}>{moveInfo.move?.name}</ThemedText>
                            </ThemedView>
                        ))
                    }
                </ThemedView>

            </ScrollView>
            </ThemedView>
        </>
    )
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        marginVertical: 10,
        alignSelf: 'flex-start',
    },
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        alignItems: 'center',
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
    pokemonSecondaryCard: {
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
    orderContainer: {
        borderRadius: 8,
        padding: 8,
        flex: 2,
        alignItems: 'center',
    },
    order: {
        fontSize: 18,
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
    pokemonBadgesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    pokemonDescription: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
        textAlign: 'left',
        width: '100%',
    },
    typeBadge: {
        borderRadius: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        borderWidth: 1,
    },
    type: {
        fontSize: 12,
        textTransform: 'capitalize',
        marginHorizontal: 5,
    },
});