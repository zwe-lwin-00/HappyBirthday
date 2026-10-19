import { useEffect, useState } from "react";
import { TURNING } from "../config";

export function useCountdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = TURNING.getTime() - now.getTime();
  const total = Math.floor(Math.max(0, diff) / 1000);
  const month = now.getMonth();
  const day = now.getDate();
  let age = now.getFullYear() - 2001;
  if (month < 9 || (month === 9 && day < 20)) age -= 1;

  return {
    now,
    done: diff <= 0,
    isBirthday: month === 9 && day === 20,
    age,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
