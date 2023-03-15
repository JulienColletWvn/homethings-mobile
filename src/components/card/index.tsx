import { PropsWithChildren } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { colors, shadows } from "../../styles";

const Card = ({ children }: PropsWithChildren<{}>) => (
  <View style={styles.container}>{children}</View>
);

const Content = ({ children }: PropsWithChildren<{}>) => (
  <View style={styles.content}>{children}</View>
);

const Label = ({ children }: PropsWithChildren<{}>) => (
  <Text style={styles.label}>{children}</Text>
);

const Icon = ({
  children,
  onClick,
}: PropsWithChildren<{ onClick?(): void }>) => (
  <TouchableOpacity onPress={onClick}>
    <View style={styles.icon}>{children}</View>
  </TouchableOpacity>
);

const Header = ({
  left,
  children,
  right,
}: PropsWithChildren<{ left?: JSX.Element; right?: JSX.Element }>) => (
  <View style={styles.header}>
    {left}
    {children}
    {right}
  </View>
);

Card.Header = Header;
Card.Content = Content;
Card.Label = Label;
Card.Icon = Icon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    marginBottom: 16,
    ...shadows[5],
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  label: {
    color: colors.lightFont,
    fontFamily: "SourceSansPro_400Regular",
    fontSize: 14,
  },
  icon: {},
});

export default Card;
