function pad(value) {
  return String(value).padStart(2, "0");
}

export default function Countdown({ countdown }) {
  if (countdown.canOpen && countdown.isBirthday) {
    return <p className="today-banner">Today is 20 October. Happy 25th birthday — open the journal.</p>;
  }

  if (countdown.canOpen) {
    return <p className="today-banner">The countdown is over. Open the journal whenever you like.</p>;
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
