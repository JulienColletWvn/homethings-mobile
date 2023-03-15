import Card from "../../../components/card";
import { DeviceDataType } from "../../../services/index";
import { LastLevel } from "./last";

export const Level = ({
  deviceDataType,
  deviceId,
}: {
  deviceDataType: DeviceDataType;
  deviceId: string;
}) => (
  <Card>
    <LastLevel deviceDataType={deviceDataType} deviceId={deviceId} />
    <Card.Content />
  </Card>
);
