import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/context/AuthContext";

/**
 * The home screen of the application.
 * This component displays a simple welcome message in the center of the screen.
 * @returns {JSX.Element} The rendered home screen.
 */
export default function HomeScreen() {
    const { session } = useAuth();
    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Hola, {session?.email || 'Pokémon'}!</ThemedText>
        </ThemedView>
    )
}
