import { useMemo, useState } from "react";
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

const STORY = [
  {
    id: "born",
    when: "20 Oct 2001",
    title: "You arrived",
    note: "A Saturday. The world got louder — in the best way.",
  },
  {
    id: "us",
    when: "12 Feb 2024",
    title: "Ours began",
    note: "The day my days found a better center.",
  },
  {
    id: "now",
    when: "20 Oct 2026",
    title: "Twenty-five",
    note: "This birthday. This journal. This wish for more years of us.",
  },
];

function shuffleStory() {
  const next = [...STORY];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  if (next.every((item, index) => item.id === STORY[index].id)) {
    [next[0], next[1]] = [next[1], next[0]];
  }
  return next;
}

export default function Libra() {
  const [left, setLeft] = useState(2);
  const [right, setRight] = useState(2);
  const [order, setOrder] = useState(shuffleStory);
  const [picked, setPicked] = useState(null);
  const [storyDone, setStoryDone] = useState(false);

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

  function tapMoment(index) {
    if (storyDone) return;
    if (picked === null) {
      setPicked(index);
      return;
    }
    if (picked === index) {
      setPicked(null);
      return;
    }
    const next = [...order];
    [next[picked], next[index]] = [next[index], next[picked]];
    setOrder(next);
    setPicked(null);
    if (next.every((item, i) => item.id === STORY[i].id)) {
      setStoryDone(true);
    }
  }

  function reshuffle() {
    setOrder(shuffleStory());
    setPicked(null);
    setStoryDone(false);
  }

  return (
    <Reveal as="section" className="band wrap" id="libra">
      <div className="section-head">
        <p className="kicker">20 October · Libra</p>
        <h2>
          Under the <em>scales</em>
        </h2>
        <p>Born beneath Libra — an air sign, ruled by Venus. A balance game, and a story only we share.</p>
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

        <article className={`libra-card story-card${storyDone ? " is-done" : ""}`}>
          <p className="kicker">Our story</p>
          <h3>Put the moments in order</h3>
          <p className="puzzle-help">Tap one card, then another to swap. Oldest first.</p>

          <ol className="story-board">
            {order.map((moment, index) => (
              <li key={moment.id}>
                <button
                  type="button"
                  className={
                    storyDone
                      ? "story-moment is-done"
                      : picked === index
                        ? "story-moment is-picked"
                        : "story-moment"
                  }
                  onClick={() => tapMoment(index)}
                  disabled={storyDone}
                >
                  <span className="story-step">{index + 1}</span>
                  <span className="story-copy">
                    <strong>{moment.when}</strong>
                    <em>{moment.title}</em>
                    <span>{moment.note}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="path-actions">
            <p className="puzzle-status" aria-live="polite">
              {storyDone
                ? "That’s us. From your first day to this one — and still going."
                : picked === null
                  ? "Pick a moment to move."
                  : "Now pick where it should go."}
            </p>
            <button type="button" className="btn secondary" onClick={reshuffle}>
              Shuffle again
            </button>
          </div>
        </article>
      </div>
    </Reveal>
  );
}
