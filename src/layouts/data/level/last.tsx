import { useState, useEffect } from "react";
import Card from "../../../components/card";
import { Data } from "../../../components/typography";
import {
  DeviceDataType,
  getData,
  Data as DataType,
} from "../../../services/index";
import { Rain } from "../../../components/icons";
import { colors } from "../../../styles";
import { useElapsedTime } from "../../../hooks/useElapsedTime";

export const LastLevel = ({
  deviceDataType,
  deviceId,
}: {
  deviceDataType: DeviceDataType;
  deviceId: string;
}) => {
  const [value, setValue] = useState<DataType>(null);
  const { timeLabel } = useElapsedTime({ dateString: value?.created_at?.Time });

  useEffect(() => {
    (async function () {
      const res = await getData({
        deviceId,
        deviceDataTypeKey: deviceDataType.key,
        timeframe: "last",
      });

      res.response && !Array.isArray(res.response) && setValue(res.response);
    })();
  }, []);

  if (value == null) return null;

  return (
    <>
      <Card.Header
        left={<Card.Label>{timeLabel}</Card.Label>}
        right={
          <Card.Icon>
            <Rain color={colors.lightFont} width={16} />
          </Card.Icon>
        }
      />
      <Card.Content>
        <Data value={value?.value} unit="%" />
      </Card.Content>
    </>
  );
};
