import Constants from "expo-constants";

export const query = async <T>({
  path,
  options,
}: {
  path: string;
  options?: Record<string, string>;
}): Promise<{ response: T; error: string }> => {
  const key = JSON.stringify({ path, options });

  if (query.cache[key]) query.cache[key];

  try {
    const res = await fetch(Constants.expoConfig.extra.baseUrl + path, {
      ...options,
    });
    if (!res.ok) query.cache[key] = { response: null, error: "Unknown error" };
    else {
      const data = (await res.json()) as T;
      query.cache[key] = { response: data, error: null };
    }
  } catch (e) {
    query.cache[key] = { response: null, error: e.message };
  }

  return query.cache[key];
};

query.cache = {};

export type Device = {
  id: string;
  location: string;
  name: string;
  created_at: {
    Time: string;
  };
};

export type DeviceDataTypeKey =
  | "temperature"
  | "humidity"
  | "distance"
  | "position"
  | "levelPercentage";

export type DeviceDataType = {
  device_id: {
    String: string;
  };
  id: number;
  key: DeviceDataTypeKey;
  unit: string;
};

export type Data = {
  created_at: {
    Time: string;
  };
  unit: string;
  value: number;
};

export type Timeframe = "last" | "hourly" | "daily" | "monthly" | "yearly";

export const getDevices = async () =>
  await query<Device[]>({ path: "/devices" });

export const getDeviceDataTypes = async ({ deviceId }) =>
  await query<DeviceDataType[]>({ path: `/devices/${deviceId}/data-types` });

export const getData = async ({
  deviceId,
  deviceDataTypeKey,
  from = "1970-01-01",
  to = (function () {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    return now.toISOString().split("T")[0];
  })(),
  timeframe,
}: {
  deviceId: string;
  deviceDataTypeKey: DeviceDataTypeKey;
  from?: string;
  to?: string;
  timeframe: Timeframe;
}) =>
  await query<Data | Data[]>({
    path: `/devices/${deviceId}/data-types/${deviceDataTypeKey}/datas/${timeframe}?fromDate=${from}&toDate=${to}`,
  });
