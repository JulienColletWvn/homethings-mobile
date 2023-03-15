import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Data, DeviceDataType, getData, Timeframe } from "../../../services";
import { Graph } from "../../../components/graph";
import Card from "../../../components/card";
import { Pill } from "../../../components/button";

type Config = {
  from: string;
  timeframe: Timeframe;
  label: string;
  key: string;
  getLabels: (data: Data[]) => string[];
  transformData: (data: Data[]) => Data[];
  title: string;
};

export const Evolution = ({
  deviceDataType,
  deviceId,
}: {
  deviceDataType: DeviceDataType;
  deviceId: string;
}) => {
  const configs: Config[] = [
    {
      title: "Last 24 hours",
      from: (function () {
        const now = new Date();
        now.setDate(now.getDate() - 1);
        return now.toISOString().split("T")[0];
      })(),
      label: "1D",
      timeframe: "hourly",
      key: "day",
      transformData: (data) => data.slice(-23),
      getLabels: (data) =>
        data.map((d) => String(new Date(d.created_at.Time).getHours())),
    },
    {
      title: "Last Week",
      from: (function () {
        const now = new Date();
        now.setDate(now.getDate() - 7);
        return now.toISOString().split("T")[0];
      })(),
      label: "1W",
      timeframe: "daily",
      key: "week",
      transformData: (d) => d,
      getLabels: (data) =>
        data.map((d) => String(new Date(d.created_at.Time).getDate())),
    },
    {
      title: "Last Month",
      from: (function () {
        const now = new Date();
        now.setMonth(now.getMonth() - 1);
        return now.toISOString().split("T")[0];
      })(),
      label: "1M",
      timeframe: "daily",
      key: "month",
      transformData: (d) => d,
      getLabels: (data) =>
        data.map(
          (d) =>
            String(
              new Date(d.created_at.Time).toLocaleDateString("en", {
                weekday: "long",
              })
            )[0]
        ),
    },
  ];

  const [data, setData] = useState<Data[]>();
  const [config, setConfig] = useState<Config>(configs[0]);
  const labels = config.getLabels(data ?? []);

  useEffect(() => {
    (async function () {
      const res = await getData({
        deviceId,
        deviceDataTypeKey: deviceDataType.key,
        timeframe: config.timeframe,
        from: config.from,
      });
      res.response &&
        Array.isArray(res.response) &&
        setData(config.transformData(res.response));
    })();
  }, [config]);

  if (data == null) return null;

  return (
    <>
      <Card.Header
        left={
          <Card.Label>
            {configs.find((c) => c.key === config.key)?.title}
          </Card.Label>
        }
      />
      <Graph
        data={data.map((d, i) => ({ ...d, label: labels[i] }))}
        ratio={2}
      />
      <View style={styles.buttonContainer}>
        {configs.map((c) => (
          <Pill
            key={c.key}
            onClick={() => setConfig(c)}
            active={config.key === c.key}
            label={c.label}
          />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});
