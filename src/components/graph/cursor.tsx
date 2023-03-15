import React, { useRef } from "react";
import {
  StyleSheet,
  Animated,
  PanResponder,
  View,
  TextInput,
  Platform,
} from "react-native";
import { interpolate } from "react-native-reanimated";
import { getYForX, parse, clamp } from "react-native-redash";
import { colors } from "../../styles";

const RADIUS = 6;
const LABEL_WIDTH = 48;
const LABEL_HEIGHT = 28;
interface CursorProps {
  d: string;
  width: number;
  chartWidth: number;
  tooltips: string[];
  paddingLeft: number;
  paddingRight: number;
  left: number;
}

export const Cursor = ({
  d,
  width,
  chartWidth,
  tooltips,
  paddingLeft,
  left,
}: CursorProps) => {
  const path = parse(d);
  const label = useRef<TextInput>(null);
  const labelOpacity = useRef(new Animated.Value(0)).current;
  const labelPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const cursorPosition = useRef(
    (function () {
      const x = clamp(0, paddingLeft, width + paddingLeft);

      const getX = () => {
        if (path?.move?.x && path.move.x > x) return path.move.x;
        return x;
      };

      const y = getYForX(path, getX());
      return new Animated.ValueXY({ x: x - RADIUS, y: y - RADIUS });
    })()
  ).current;

  const panResponder = React.useRef(
    (function () {
      let updatePosition;
      let labelIndex;
      return PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderStart: (_, { x0 }) => {
          const x = clamp(x0 - left, paddingLeft, width + paddingLeft);
          const y = getYForX(path, x);
          updatePosition = (posX, posY) => {
            const min = paddingLeft;
            const max =
              width + paddingLeft - LABEL_WIDTH < paddingLeft
                ? paddingLeft
                : width + paddingLeft - LABEL_WIDTH;
            labelPosition.setValue({
              x:
                min === max && posX >= chartWidth - posX
                  ? posX - LABEL_WIDTH
                  : clamp(posX - LABEL_WIDTH / 2, min, max),
              y: posY - LABEL_HEIGHT - 36,
            });
            cursorPosition.setValue({ x: posX - RADIUS, y: posY - RADIUS });
            labelIndex = Math.floor(
              interpolate(
                posX,
                [paddingLeft, width + paddingLeft],
                [0, tooltips.length - 1]
              )
            );

            const labelContent = tooltips[labelIndex];

            if (labelContent) {
              labelOpacity.setValue(1);
              label.current.setNativeProps({
                text: labelContent,
              });
            } else {
              labelOpacity.setValue(0);
            }
          };
          if (y) {
            updatePosition(x, y);
          }
        },
        onPanResponderMove: (_, { x0, dx }) => {
          const x = clamp(x0 - left + dx, paddingLeft, width + paddingLeft);
          const y = getYForX(path, x);
          if (y) updatePosition(x, y);
        },
        onPanResponderRelease: async () => {
          Animated.timing(labelOpacity, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
            delay: 1000,
          }).start();
        },
      });
    })()
  ).current;

  return (
    <Animated.View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View style={[styles.cursor, cursorPosition.getLayout()]} />
      <Animated.View style={labelPosition.getLayout()}>
        <Animated.View style={{ opacity: labelOpacity }}>
          <View style={styles.labelContainer}>
            <View style={styles.labelContainerHeader}>
              <TextInput ref={label} style={styles.label} editable={false} />
            </View>
            <View style={styles.labelTip} />
          </View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

// Note: on Android, PanResponder doesn't work when view is Transparent

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
  cursor: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
    backgroundColor: "white",
  },
  labelContainer: {
    justifyContent: "center",
    position: "absolute",
    zIndex: 10,
    padding: 4,
    borderRadius: 4,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: LABEL_WIDTH,
    height: LABEL_HEIGHT,
  },
  labelContainerHeader: {
    flexDirection: "row",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    fontFamily: "SourceSansPro_600SemiBold",
    fontWeight: "500",
    color: colors.cardBackground,
    marginHorizontal: 2,
  },
  labelTip: {
    bottom: 0,
    transform: [
      {
        translateX: LABEL_WIDTH / 2 - 4,
      },
      {
        translateY: 3,
      },
      {
        rotate: "45deg",
      },
    ],
    position: "absolute",
    backgroundColor: "white",
    width: 8,
    height: 8,
  },
});
