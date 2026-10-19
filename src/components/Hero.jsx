import { AGE, anniLabel, birthLabel, config, pinks, yearsTogether } from "../config";
import Atom from "./Atom";
import Countdown from "./Countdown";
import Reveal from "./Reveal";

export default function Hero({ countdown }) {
  const name = config.herName.trim();
  const full = config.herFullName.trim();
  const together = yearsTogether(countdown.now);

  return (
    <Reveal as="header" className="hero wrap" id="hello">
      <div className="hero-copy">
        <p className="kicker">Volume {AGE} · 20 October 2026</p>
        <h2>
          Happy
          <em> birthday{name ? "," : ""}</em>
          {name ? <span className="hero-name">{name}</span> : null}
        </h2>
        <p className="lede">
          {full ? `${full}. ` : ""}
          Born on a Saturday, still treating a day like something you move through. Soft color, quick
          feet, and a laugh that fills a room.
        </p>
        <ul className="facts">
          <li>{birthLabel}</li>
          <li>Turning {AGE}</li>
          <li>Always in motion</li>
          <li>Ours since {anniLabel}</li>
          {together > 0 ? <li>{together} year{together === 1 ? "" : "s"} together</li> : null}
        </ul>
      </div>

      <aside className="specimen">
        <div className="specimen-head">
          <span>Specimen</span>
          <span>Htet · 25</span>
        </div>
        <Atom />
        <Countdown countdown={countdown} />
        <div className="swatches" aria-label="Shades of pink">
          {pinks.map(([color, label]) => (
            <div key={label} className="swatch">
              <i style={{ background: color }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </aside>
    </Reveal>
  );
}
