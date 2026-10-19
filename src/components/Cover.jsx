import { AGE, birthLabel, config } from "../config";
import Atom from "./Atom";
import Countdown from "./Countdown";
import Floaters from "./Floaters";

export default function Cover({ countdown, onOpen }) {
  const waiting = !countdown.done;
  const name = config.herName.trim();

  return (
    <section className="cover">
      <Floaters />
      <div className="cover-top">
        <span>Vol. {AGE}</span>
        <span>20 Oct</span>
      </div>

      <div className="cover-body">
        <div className="cover-atom">
          <Atom />
          <span className="cover-bow" aria-hidden="true" />
        </div>
        <p className="kicker cover-fade" style={{ "--d": "120ms" }}>
          {birthLabel}
        </p>
        <h1 className="cover-fade" style={{ "--d": "220ms" }}>
          <span>Field journal</span>
          <strong>{AGE}</strong>
        </h1>
        <p className="cover-lede cover-fade" style={{ "--d": "360ms" }}>
          {waiting
            ? `For ${name || "her"}. Always in motion. Soft color. A day waiting to be opened.`
            : `Open it. ${name || "She"} is twenty-five, and the day is hers.`}
        </p>
        <div className="cover-fade" style={{ "--d": "480ms" }}>
          <Countdown countdown={countdown} />
        </div>
        <button type="button" className="btn cover-fade" style={{ "--d": "600ms" }} onClick={onOpen}>
          {waiting ? "Open the journal" : "Begin the celebration"}
        </button>
      </div>

      <p className="cover-foot">Pink · motion · Htet</p>
    </section>
  );
}
