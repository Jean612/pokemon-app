import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    gap: 12,
    marginVertical: 20,
  },
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
  },
});
