import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const router = useRouter();

  if (!session) {
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
        <ThemedText type="subtitle">
          Contenido exclusivo para miembros
        </ThemedText>
        <Pressable onPress={() => router.push("/login")}>
          <ThemedText type="link">
            Por favor, inicia sesión para continuar.
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return <>{children}</>;
}
