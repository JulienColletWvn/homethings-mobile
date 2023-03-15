import React, { useRef, useState } from "react";
import { View } from "react-native";

interface Container {
  children({
    width,
  }: {
    width: number;
    height: number;
    left: number;
    right: number;
  }): React.ReactNode;
}

export const Container = ({ children }: Container) => {
  const containerRef = useRef<View>();
  const [containerSize, setContainerSize] = useState<{
    width?: number;
    height?: number;
    left?: number;
    right?: number;
  }>();

  return (
    <View
      ref={containerRef}
      style={{ width: "100%" }}
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => {
        containerRef.current.measure((...args) => {
          const posX = args[4];
          const posY = args[5];
          if (posX && posY)
            setContainerSize(() => ({
              width,
              height,
              left: posX,
              right: posY,
            }));
        });
      }}
    >
      {containerSize
        ? children({
            width: containerSize.width,
            height: containerSize.height,
            left: containerSize.left,
            right: containerSize.right,
          })
        : null}
    </View>
  );
};
