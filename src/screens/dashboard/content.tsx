import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import { colors } from "../../styles";
import {
  getDeviceDataTypes,
  Device,
  DeviceDataType,
} from "../../services/index";
import { Temperature, Humidity, Level } from "../../layouts/data/";

const getDataVisualisationCard = ({
  dataType,
  deviceId,
}: {
  dataType: DeviceDataType;
  deviceId: string;
}) => {
  if (dataType.key === "temperature")
    return (
      <Temperature
        key={dataType.key}
        deviceDataType={dataType}
        deviceId={deviceId}
      />
    );
  if (dataType.key === "humidity")
    return (
      <Humidity
        key={dataType.key}
        deviceDataType={dataType}
        deviceId={deviceId}
      />
    );
  if (dataType.key === "levelPercentage")
    return (
      <Level key={dataType.key} deviceDataType={dataType} deviceId={deviceId} />
    );
};

export const Content = ({ device }: { device: Device }) => {
  const [dataTypes, setDataTypes] = useState<DeviceDataType[]>();
  const { width } = useWindowDimensions();

  useEffect(() => {
    (async function () {
      const res = await getDeviceDataTypes({ deviceId: device.id });
      res.response && setDataTypes(res.response);
    })();
  }, []);

  return (
    <ScrollView style={{ ...styles.scrollContainer, width }}>
      {dataTypes &&
        dataTypes
          .sort((a) => {
            if (a.key === "temperature") return -1;
            return 1;
          })
          .map((dataType) =>
            getDataVisualisationCard({ dataType, deviceId: device.id })
          )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
