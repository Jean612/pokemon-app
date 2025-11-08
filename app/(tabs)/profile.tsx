import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { Pressable, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const { session } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Perfil</ThemedText>
      <ThemedText style={styles.email}>{session?.email}</ThemedText>

      <Pressable style={styles.button} onPress={() => auth.signOut()}>
        <ThemedText style={styles.buttonText}>Cerrar Sesión</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  email: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#DC0A2D",
    padding: 15,
    borderRadius: 4,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
