import { useEffect, useState } from "react";
import { getElapsedTimeString } from "../utils/time";

export const useElapsedTime = ({ dateString }) => {
  const [timeLabel, setTimeLabel] = useState<string>("");

  useEffect(() => {
    dateString && setTimeLabel(getElapsedTimeString({ date: dateString }));
    const timer = setInterval(() => {
      dateString && setTimeLabel(getElapsedTimeString({ date: dateString }));
    }, 10000);
    return () => clearInterval(timer);
  }, [dateString]);

  return {
    timeLabel,
  };
};
