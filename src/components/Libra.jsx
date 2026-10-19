import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";

const NOTES = [
  {
    title: "Air",
    text: "You move like weather: quick, bright, and hard to pin down for long.",
  },
  {
    title: "Venus",
    text: "Soft color finds you. So do pretty things, pink ribbons, and a room that feels kinder.",
  },
  {
    title: "Balance",
    text: "Not stillness. Balance. Motion on one side, calm on the other, both somehow yours.",
  },
];

const GOAL = 25;

function makeSpark(id) {
  return {
    id,
    left: 8 + Math.random() * 78,
    top: 10 + Math.random() * 68,
    size: 0.85 + Math.random() * 0.55,
    delay: Math.random() * 1.2,
    hue: Math.random() > 0.45 ? "rose" : "gold",
  };
}

function makeField() {
  return Array.from({ length: 7 }, (_, index) => makeSpark(index + 1));
}

export default function Libra() {
  const [left, setLeft] = useState(2);
  const [right, setRight] = useState(2);
  const [caught, setCaught] = useState(0);
  const [sparks, setSparks] = useState(makeField);
  const [burst, setBurst] = useState(0);
  const done = caught >= GOAL;

  const tip = useMemo(() => {
    const diff = right - left;
    return Math.max(-18, Math.min(18, diff * 6));
  }, [left, right]);
  const balanced = left === right && left > 0;
  const progress = Math.min(100, (caught / GOAL) * 100);

  useEffect(() => {
    if (done) return undefined;
    const id = window.setInterval(() => {
      setSparks((current) => {
        if (current.length >= 8) return current;
        return [...current, makeSpark(Date.now() + Math.random())];
      });
    }, 900);
    return () => window.clearInterval(id);
  }, [done]);

  function add(side) {
    if (side === "left") setLeft((value) => Math.min(6, value + 1));
    else setRight((value) => Math.min(6, value + 1));
  }

  function resetScales() {
    setLeft(2);
    setRight(2);
  }

  function catchSpark(id) {
    if (done) return;
    setSparks((current) => current.filter((spark) => spark.id !== id));
    setCaught((value) => Math.min(GOAL, value + 1));
    setBurst((value) => value + 1);
  }

  function playAgain() {
    setCaught(0);
    setSparks(makeField());
    setBurst(0);
  }

  return (
    <Reveal as="section" className="band wrap" id="libra">
      <div className="section-head">
        <p className="kicker">20 October · Libra</p>
        <h2>
          Under the <em>scales</em>
        </h2>
        <p>Born beneath Libra — an air sign, ruled by Venus. Balance first. Then catch twenty-five soft sparks.</p>
      </div>

      <div className="libra-grid">
        <article className="libra-card sign-card">
          <div className="libra-glyph" aria-hidden="true">
            ♎
          </div>
          <p className="kicker">The sign</p>
          <h3>Libra</h3>
          <ul className="libra-notes">
            {NOTES.map((note) => (
              <li key={note.title}>
                <strong>{note.title}</strong>
                <span>{note.text}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className={`libra-card scales-card${balanced ? " is-balanced" : ""}`}>
          <p className="kicker">Balance</p>
          <h3>Find the middle</h3>
          <p className="puzzle-help">Tip the scales left or right until they settle even.</p>

          <div className="scales" style={{ "--tip": `${tip}deg` }}>
            <div className="scales-stand" aria-hidden="true" />
            <div className="scales-beam" aria-hidden="true">
              <span className="scales-pan left">
                {Array.from({ length: left }, (_, i) => (
                  <i key={`l${i}`} />
                ))}
              </span>
              <span className="scales-fulcrum" />
              <span className="scales-pan right">
                {Array.from({ length: right }, (_, i) => (
                  <i key={`r${i}`} />
                ))}
              </span>
            </div>
          </div>

          <div className="scales-controls">
            <button type="button" className="btn secondary" onClick={() => add("left")}>
              + Left
            </button>
            <button type="button" className="btn secondary" onClick={resetScales}>
              Reset
            </button>
            <button type="button" className="btn secondary" onClick={() => add("right")}>
              + Right
            </button>
          </div>

          <p className="puzzle-status" aria-live="polite">
            {balanced
              ? "Balanced. Soft and steady — very Libra, very Htet."
              : tip < 0
                ? "Leaning left…"
                : tip > 0
                  ? "Leaning right…"
                  : "Even for now."}
          </p>
        </article>

        <article className={`libra-card spark-card${done ? " is-done" : ""}`}>
          <p className="kicker">Twenty-five</p>
          <h3>Catch the soft sparks</h3>
          <p className="puzzle-help">Tap every little light. One for each year.</p>

          <div className="spark-meter" aria-hidden="true">
            <span className="spark-meter-fill" style={{ width: `${progress}%` }} />
            <em>
              {caught} / {GOAL}
            </em>
          </div>

          <div className={`spark-field${done ? " is-done" : ""}`} key={burst}>
            {done ? (
              <p className="spark-win">
                All twenty-five. Happy birthday, Htet —
                <em> lit up.</em>
              </p>
            ) : (
              sparks.map((spark) => (
                <button
                  key={spark.id}
                  type="button"
                  className={`spark-dot is-${spark.hue}`}
                  style={{
                    left: `${spark.left}%`,
                    top: `${spark.top}%`,
                    "--size": spark.size,
                    "--delay": `${spark.delay}s`,
                  }}
                  onClick={() => catchSpark(spark.id)}
                  aria-label="Catch a spark"
                />
              ))
            )}
          </div>

          <div className="path-actions">
            <p className="puzzle-status" aria-live="polite">
              {done ? "Every year caught. Soft and bright." : "They’re quick — keep tapping."}
            </p>
            <button type="button" className="btn secondary" onClick={playAgain}>
              Play again
            </button>
          </div>
        </article>
      </div>
    </Reveal>
  );
}
