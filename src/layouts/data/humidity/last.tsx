import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Card from "../../../components/card";
import { Data } from "../../../components/typography";
import {
  DeviceDataType,
  getData,
  Data as DataType,
} from "../../../services/index";
import { Hygromether } from "../../../components/icons";
import { colors } from "../../../styles";
import { Level } from "./level";
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
            <Hygromether color={colors.lightFont} width={16} />
          </Card.Icon>
        }
      />
      <Card.Content>
        <View style={styles.container}>
          <Data value={value?.value.toFixed(0)} unit="%" />
          <Level level={value?.value} />
        </View>
      </Card.Content>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
