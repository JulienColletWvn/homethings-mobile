import { StyleSheet } from "react-native";
import Card from "../../../components/card";
import { colors } from "../../../styles";
import { DeviceDataType } from "../../../services/index";
import { LastTemperature } from "./last";

export const Humidity = ({
  deviceDataType,
  deviceId,
}: {
  deviceDataType: DeviceDataType;
  deviceId: string;
}) => {
  return (
    <Card>
      <LastTemperature deviceDataType={deviceDataType} deviceId={deviceId} />
      <Card.Content />
    </Card>
  );
};
