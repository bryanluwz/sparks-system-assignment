import React from "react";
import { LastUpdatedTimerProps } from "../../typings/component/LastUpdatedTimer";

export const LastUpdatedTimer = ({
  time,
  status,
  messages,
}: LastUpdatedTimerProps) => {
  const [elapsedTime, setElapsedTime] = React.useState("");

  React.useEffect(() => {
    const updateTime = () => {
      if (status === "LOADING") {
        setElapsedTime(messages.LOADING);
        return;
      }

      if (status === "ERROR") {
        setElapsedTime(messages.ERROR);
        return;
      }

      if (status === "STALE") {
        setElapsedTime(messages.STALE);
        return;
      }

      if (!time) {
        setElapsedTime(messages.LOADING);
        return;
      }

      const ms = Date.now() - new Date(time).getTime();

      if (ms < 1000) {
        setElapsedTime(messages.LIVE);
      } else {
        const seconds = Math.floor(ms / 1000);
        setElapsedTime(`${seconds} s ago`);
      }
    };

    updateTime();

    const intervalId = setInterval(updateTime, 250);

    return () => clearInterval(intervalId);
  }, [time, status, messages]);

  return <>{elapsedTime}</>;
};
