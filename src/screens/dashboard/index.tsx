import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Text } from "react-native";
import { colors } from "../../styles";
import { getDevices, Device } from "../../services/index";
import { Content } from "./content";

const Index = () => {
  const [devices, setDevices] = useState<Device[]>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemChanged = useRef(
    ({ viewableItems }) =>
      viewableItems[0] && setCurrentIndex(viewableItems[0].index)
  ).current;

  useEffect(() => {
    (async function () {
      const devices = await getDevices();
      devices.response && setDevices(devices.response);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {devices && devices[currentIndex].location}
          </Text>
        </View>
        <FlatList
          onViewableItemsChanged={onViewableItemChanged}
          data={devices}
          renderItem={({ item }) => <Content device={item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
});
