import { useCallback, useEffect, useState } from "react";
import {
  useFonts,
  SourceSansPro_200ExtraLight,
  SourceSansPro_200ExtraLight_Italic,
  SourceSansPro_300Light,
  SourceSansPro_300Light_Italic,
  SourceSansPro_400Regular,
  SourceSansPro_400Regular_Italic,
  SourceSansPro_600SemiBold,
  SourceSansPro_600SemiBold_Italic,
  SourceSansPro_700Bold,
  SourceSansPro_700Bold_Italic,
  SourceSansPro_900Black,
  SourceSansPro_900Black_Italic,
} from "@expo-google-fonts/source-sans-pro";
import * as SplashScreen from "expo-splash-screen";

import { Navigation } from "./src/navigators";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState<boolean>(false);
  let [fontsLoaded] = useFonts({
    SourceSansPro_200ExtraLight,
    SourceSansPro_200ExtraLight_Italic,
    SourceSansPro_300Light,
    SourceSansPro_300Light_Italic,
    SourceSansPro_400Regular,
    SourceSansPro_400Regular_Italic,
    SourceSansPro_600SemiBold,
    SourceSansPro_600SemiBold_Italic,
    SourceSansPro_700Bold,
    SourceSansPro_700Bold_Italic,
    SourceSansPro_900Black,
    SourceSansPro_900Black_Italic,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && ready) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, ready]);

  if (!fontsLoaded || !ready) return null;

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#1E1F1E",
      }}
      onLayout={onLayoutRootView}
    >
      <Navigation />
    </View>
  );
}
