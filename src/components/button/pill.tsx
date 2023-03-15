import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors } from "../../styles";

export const Pill = ({ onClick, label, active }) => (
  <TouchableOpacity
    onPress={onClick}
    style={{ ...styles.container, ...(active && styles.activeContainer) }}
  >
    <Text style={{ ...styles.label, ...(active && styles.activeLabel) }}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 24,
    borderColor: "white",
    borderWidth: 1.5,
  },
  activeContainer: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  label: {
    fontFamily: "SourceSansPro_600SemiBold",
    color: "white",
  },
  activeLabel: {},
});
