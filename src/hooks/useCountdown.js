import { useEffect, useState } from "react";
import { TURNING } from "../config";

/** True from local midnight on 20 Oct 2026 onward — journal may open. */
export function canOpenJournal(now = new Date()) {
  if (now.getTime() >= TURNING.getTime()) return true;

  // Calendar safety net (same local day as TURNING, in case of clock edge cases)
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  if (year > 2026) return true;
  if (year === 2026 && month > 9) return true; // Nov 2026+
  if (year === 2026 && month === 9 && day >= 20) return true; // 20 Oct 2026+
  return false;
}

export function useCountdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = TURNING.getTime() - now.getTime();
  const total = Math.floor(Math.max(0, diff) / 1000);
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  let age = year - 2001;
  if (month < 9 || (month === 9 && day < 20)) age -= 1;

  const done = diff <= 0;
  const canOpen = canOpenJournal(now);
  const isBirthday = month === 9 && day === 20;

  return {
    now,
    done,
    canOpen,
    isBirthday,
    age,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
