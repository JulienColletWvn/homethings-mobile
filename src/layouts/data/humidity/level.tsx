import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../../styles";

export const Level = ({ level }: { level: number }) => {
  const currentLevelBar = Math.ceil((level / 80) * 7);
  const currentLabel = 3 - Math.floor((currentLevelBar / 7) * 3);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.column}>
          {new Array(7).fill(null).map((_, i) => {
            const active = currentLevelBar > 7 - i;
            return (
              <View
                key={`level-${i}`}
                style={{
                  ...styles.levelBar,
                  ...(active && styles.activeLevelBar),
                }}
              />
            );
          })}
        </View>
        <View style={styles.column}>
          {["Wet", "Good", "Dry"].map((label, i) => (
            <Text
              key={label}
              style={{
                ...styles.label,
                ...(i === currentLabel && styles.activeLabel),
              }}
            >
              {label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: 100,
    height: 52,
    flex: 1,
    marginRight: 32,
  },
  content: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  levelBar: {
    width: 64,
    height: 8,
    backgroundColor: colors.background,
    marginVertical: 2,
    borderRadius: 8,
  },
  activeLevelBar: {
    backgroundColor: colors.accent,
  },
  label: {
    fontSize: 12,
    fontFamily: "SourceSansPro_400Regular",
    textTransform: "uppercase",
    marginLeft: 16,
    color: colors.lightFont,
  },
  activeLabel: {
    fontFamily: "SourceSansPro_600SemiBold",
    color: "white",
  },
});
