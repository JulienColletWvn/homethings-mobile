import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../styles";

export const Data = ({ value, unit }) => (
  <View style={styles.container}>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.unit}>{unit}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: 52,
    overflow: "hidden",
  },
  value: {
    marginTop: -22,
    flex: 0,
    fontFamily: "SourceSansPro_600SemiBold",
    color: "white",
    fontSize: 72,
  },
  unit: {
    fontFamily: "SourceSansPro_400Regular",
    marginLeft: 8,
    color: "white",
    fontSize: 40,
  },
});
