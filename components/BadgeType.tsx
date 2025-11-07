import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PokemonTypeColors } from '@/constants/PokemonTypes';
import { StyleSheet } from 'react-native';

type BadgeTypeProps = {
    name: string;
};

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