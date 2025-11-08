import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PokemonTypeColors } from '@/constants/PokemonTypes';
import { StyleSheet } from 'react-native';

/**
 * @param name The name of the Pokémon type.
 */
type BadgeTypeProps = {
    name: string;
};

/**
 * A component that displays a Pokémon's type as a badge with a colored background.
 * The color of the badge is determined by the Pokémon type.
 * @param {BadgeTypeProps} props The properties for the component.
 * @returns {JSX.Element} The rendered badge.
 */
export function BadgeType({ name }: BadgeTypeProps) {
    const colorType = PokemonTypeColors[name as keyof typeof PokemonTypeColors];

    return (
        <ThemedView key={name} style={[styles.typeBadge, { backgroundColor: colorType }]}>
            <ThemedText style={styles.type}>{name}</ThemedText>
        </ThemedView>
    )

}

const styles = StyleSheet.create({
    typeBadge: {
        borderRadius: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    type: {
        fontSize: 12,
        textTransform: 'capitalize',
        marginHorizontal: 5,
        color: '#fff',
    },
});