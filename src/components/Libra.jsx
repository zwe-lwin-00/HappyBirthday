import { useMemo, useState } from "react";
import Reveal from "./Reveal";

const STARS = [
  { id: 0, x: 48, y: 92, name: "Zubenelgenubi" },
  { id: 1, x: 118, y: 58, name: "Zubeneschamali" },
  { id: 2, x: 168, y: 108, name: "Brachium" },
  { id: 3, x: 220, y: 70, name: "Delta" },
  { id: 4, x: 268, y: 118, name: "Theta" },
];

const PATH = [0, 1, 2, 3, 4];

const NOTES = [
  {
    title: "Air",
    text: "She moves like weather: quick, bright, and hard to pin down for long.",
  },
  {
    title: "Venus",
    text: "Soft color finds her. So do pretty things, pink ribbons, and a room that feels kinder.",
  },
  {
    title: "Balance",
    text: "Not stillness. Balance. Motion on one side, calm on the other, both somehow hers.",
  },
];

export default function Libra() {
  const [left, setLeft] = useState(2);
  const [right, setRight] = useState(2);
  const [path, setPath] = useState([]);
  const [pathDone, setPathDone] = useState(false);
  const [pathWrong, setPathWrong] = useState(false);

  const tip = useMemo(() => {
    const diff = right - left;
    return Math.max(-18, Math.min(18, diff * 6));
  }, [left, right]);
  const balanced = left === right && left > 0;

  function add(side) {
    if (side === "left") setLeft((value) => Math.min(6, value + 1));
    else setRight((value) => Math.min(6, value + 1));
  }

  function resetScales() {
    setLeft(2);
    setRight(2);
  }

  function tapStar(id) {
    if (pathDone) return;
    const expected = PATH[path.length];
    if (id !== expected) {
      setPathWrong(true);
      setPath([]);
      window.setTimeout(() => setPathWrong(false), 550);
      return;
    }
    const next = [...path, id];
    setPath(next);
    if (next.length === PATH.length) setPathDone(true);
  }

  function resetPath() {
    setPath([]);
    setPathDone(false);
    setPathWrong(false);
  }

  return (
    <Reveal as="section" className="band wrap" id="libra">
      <div className="section-head">
        <p className="kicker">20 October · Libra</p>
        <h2>
          Under the <em>scales</em>
        </h2>
        <p>
          Born beneath Libra. An air sign, ruled by Venus. Two little puzzles for her sky.
        </p>
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
          <p className="kicker">Puzzle one</p>
          <h3>Find the balance</h3>
          <p className="puzzle-help">Add weight to either side. Libra likes the middle.</p>

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
                  : "Even for now. Add more if you like."}
          </p>
        </article>

        <article className={`libra-card path-card${pathDone ? " is-done" : ""}${pathWrong ? " is-wrong" : ""}`}>
          <p className="kicker">Puzzle two</p>
          <h3>Trace her constellation</h3>
          <p className="puzzle-help">Tap the stars in order, from the left wing across.</p>

          <div className="sky-board">
            <svg className="libra-sky" viewBox="0 0 320 170" aria-hidden="true">
              <defs>
                <linearGradient id="libraLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffb3c9" />
                  <stop offset="100%" stopColor="#e4376a" />
                </linearGradient>
              </defs>
              {PATH.slice(0, -1).map((from, index) => {
                const to = PATH[index + 1];
                const a = STARS[from];
                const b = STARS[to];
                const lit = path.length > index + 1 || pathDone;
                return (
                  <line
                    key={`${from}-${to}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    className={lit ? "sky-line is-lit" : "sky-line"}
                    stroke="url(#libraLine)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                );
              })}
              {STARS.map((star) => {
                const lit = path.includes(star.id) || pathDone;
                return (
                  <circle
                    key={`dot-${star.id}`}
                    cx={star.x}
                    cy={star.y}
                    r={lit ? 7 : 5}
                    className={lit ? "sky-dot is-lit" : "sky-dot"}
                  />
                );
              })}
            </svg>

            {STARS.map((star, index) => {
              const lit = path.includes(star.id) || pathDone;
              const next = PATH[path.length] === star.id;
              return (
                <button
                  key={star.id}
                  type="button"
                  className={lit ? "sky-hit is-lit" : next ? "sky-hit is-next" : "sky-hit"}
                  style={{ left: `${(star.x / 320) * 100}%`, top: `${(star.y / 170) * 100}%` }}
                  onClick={() => tapStar(star.id)}
                  aria-label={`Star ${index + 1}, ${star.name}`}
                />
              );
            })}
          </div>

          <div className="path-actions">
            <p className="puzzle-status" aria-live="polite">
              {pathDone
                ? "Constellation complete. Her sky is lit."
                : pathWrong
                  ? "Not that one. Start again from the left."
                  : `Star ${Math.min(path.length + 1, PATH.length)} of ${PATH.length}`}
            </p>
            {(path.length > 0 || pathDone) && (
              <button type="button" className="btn secondary" onClick={resetPath}>
                Trace again
              </button>
            )}
          </div>
        </article>
      </div>
    </Reveal>
  );
}
