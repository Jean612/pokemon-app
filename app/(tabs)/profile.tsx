import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { globalStyles } from "@/constants/styles";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { Pressable, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const { session } = useAuth();

  return (
    <ThemedView style={globalStyles.container}>
      <ThemedView style={globalStyles.headerContainer}>
        <ThemedText type="title" style={globalStyles.headerTitle}>
          Perfil
        </ThemedText>
      </ThemedView>
      <ThemedText style={styles.email}>{session?.email}</ThemedText>

      <Pressable style={styles.button} onPress={() => auth.signOut()}>
        <ThemedText style={styles.buttonText}>Cerrar Sesión</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  email: {
    fontSize: 18,
    marginVertical: 50,
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
