function pad(value) {
  return String(value).padStart(2, "0");
}

export default function Countdown({ countdown }) {
  if (countdown.isBirthday) {
    return <p className="today-banner">Today is 20 October. Happy 25th birthday.</p>;
  }

  if (countdown.done) {
    return <p className="today-banner">A journal kept from the day she turned 25.</p>;
  }

  const units = [
    countdown.days > 0 ? ["Days", countdown.days] : null,
    ["Hours", countdown.hours],
    ["Minutes", countdown.minutes],
    ["Seconds", countdown.seconds],
  ].filter(Boolean);

  return (
    <div
      className="count"
      role="group"
      aria-label={units.map(([label, value]) => `${value} ${label}`).join(", ")}
    >
      {units.map(([label, value]) => (
        <div className="count-unit" key={label}>
          <span className="count-num">{pad(value)}</span>
          <span className="count-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
