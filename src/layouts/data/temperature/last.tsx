import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Card from "../../../components/card";
import { Data } from "../../../components/typography";
import { Thermometer } from "../../../components/icons/thermometer";
import { colors } from "../../../styles";
import {
  DeviceDataType,
  getData,
  Data as DataType,
} from "../../../services/index";
import { useElapsedTime } from "../../../hooks/useElapsedTime";

export const LastTemperature = ({
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
            <Thermometer width={16} color={colors.lightFont} />
          </Card.Icon>
        }
      />
      <Card.Content>
        <Data value={value?.value} unit="°C" />
      </Card.Content>
    </>
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
