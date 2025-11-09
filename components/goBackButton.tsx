import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";

type GoBackButtonProps = {
  backgroundColor?: string;
  path?: any;
  color?: string;
  size?: number;
  text?: string;
};

export default function GoBackButton({
  backgroundColor,
  path,
  color,
  size,
  text,
}: GoBackButtonProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => (path ? router.replace(path) : router.back())}
      style={[styles.button, { backgroundColor }]}
    >
      <FontAwesome
        name="chevron-left"
        size={size || 16}
        color={color || "#fff"}
      />
      <ThemedText style={{ color: color || "#fff", fontSize: size || 16 }}>
        {text || ""}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    fontFamily: "Montserrat-Bold",
    paddingHorizontal: 10,
  },
});
