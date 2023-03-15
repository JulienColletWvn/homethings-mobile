import Card from "../../../components/card";
import { DeviceDataType } from "../../../services/index";
import { LastTemperature } from "./last";
import { Evolution } from "./evolution";

export const Temperature = ({
  deviceDataType,
  deviceId,
}: {
  deviceDataType: DeviceDataType;
  deviceId: string;
}) => (
  <Card>
    <LastTemperature deviceDataType={deviceDataType} deviceId={deviceId} />
    <Evolution deviceDataType={deviceDataType} deviceId={deviceId} />
    <Card.Content />
  </Card>
);
