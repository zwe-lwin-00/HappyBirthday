import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";

const ICONS = [
  { id: "ribbon", label: "Ribbon", draw: "ribbon" },
  { id: "tulip", label: "Bloom", draw: "tulip" },
  { id: "capy", label: "Capy", draw: "capy" },
  { id: "heart", label: "Heart", draw: "heart" },
];

function shuffle(list) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function Icon({ kind }) {
  if (kind === "ribbon") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 22c8-12 16-12 24 0 8 12 16 12 24 0" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" transform="translate(-10 4) scale(0.7)" />
        <path d="M20 22l4 10-4-2-4 2z" fill="currentColor" />
        <path d="M28 22l4 10-4-2-4 2z" fill="currentColor" opacity="0.75" />
        <ellipse cx="24" cy="22" rx="5" ry="4" fill="currentColor" opacity="0.9" />
      </svg>
    );
  }
  if (kind === "tulip") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 42V22" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M14 20c-1-10 6-16 10-18 4 2 11 8 10 18-3-4-7-5-10-5s-7 1-10 5z" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "capy") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <ellipse cx="26" cy="28" rx="14" ry="9" fill="currentColor" opacity="0.85" />
        <ellipse cx="16" cy="24" rx="8" ry="7" fill="currentColor" />
        <circle cx="14" cy="23" r="1.2" fill="#fff" />
        <circle cx="19" cy="22" r="1.2" fill="#fff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 38s-12-8-12-16c0-4 3-7 7-7 2 0 4 1 5 3 1-2 3-3 5-3 4 0 7 3 7 7 0 8-12 16-12 16z" fill="currentColor" />
    </svg>
  );
}

function buildDeck() {
  const pairs = ICONS.flatMap((item) => [
    { uid: `${item.id}-a`, pair: item.id, draw: item.draw, label: item.label },
    { uid: `${item.id}-b`, pair: item.id, draw: item.draw, label: item.label },
  ]);
  return shuffle(pairs);
}

export default function Puzzles() {
  const [deck, setDeck] = useState(buildDeck);
  const [open, setOpen] = useState([]);
  const [matched, setMatched] = useState([]);
  const [lock, setLock] = useState("");
  const [lockState, setLockState] = useState("idle");
  const [moves, setMoves] = useState(0);

  const memoryDone = matched.length === ICONS.length;
  const lockOpen = lockState === "open";

  useEffect(() => {
    if (open.length < 2) return undefined;
    const [a, b] = open;
    const first = deck.find((card) => card.uid === a);
    const second = deck.find((card) => card.uid === b);
    const id = window.setTimeout(() => {
      if (first && second && first.pair === second.pair) {
        setMatched((current) => [...current, first.pair]);
      }
      setOpen([]);
    }, 650);
    return () => window.clearTimeout(id);
  }, [open, deck]);

  const hint = useMemo(() => {
    if (lockOpen) return "Unlocked. 12 February 2024 — the day our story started.";
    if (lockState === "wrong") return "Not quite. Think of a February date.";
    return "Four digits. Day, then month. A date that belongs to us.";
  }, [lockOpen, lockState]);

  function flip(uid) {
    if (memoryDone) return;
    if (open.length >= 2) return;
    if (open.includes(uid)) return;
    const card = deck.find((item) => item.uid === uid);
    if (!card || matched.includes(card.pair)) return;
    if (open.length === 1) setMoves((value) => value + 1);
    setOpen((current) => [...current, uid]);
  }

  function resetMemory() {
    setDeck(buildDeck());
    setOpen([]);
    setMatched([]);
    setMoves(0);
  }

  function pressDigit(digit) {
    if (lockOpen) return;
    setLock((value) => {
      if (value.length >= 4) return value;
      const next = `${value}${digit}`;
      if (next.length === 4) {
        if (next === "1202") {
          setLockState("open");
        } else {
          setLockState("wrong");
          window.setTimeout(() => {
            setLock("");
            setLockState("idle");
          }, 700);
        }
      } else {
        setLockState("idle");
      }
      return next;
    });
  }

  function clearLock() {
    setLock("");
    setLockState("idle");
  }

  return (
    <Reveal as="section" className="band wrap" id="puzzles">
      <div className="section-head">
        <p className="kicker">Play</p>
        <h2>
          Tiny <em>puzzles</em>
        </h2>
        <p>A memory game, and a lock that only we should know how to open.</p>
      </div>

      <div className="puzzle-grid">
        <article className={`puzzle-card memory-card${memoryDone ? " is-done" : ""}`}>
          <p className="kicker">Puzzle three</p>
          <h3>Match the soft things</h3>
          <p className="puzzle-help">Find the pairs. Moves: {moves}</p>

          <div className="memory-grid">
            {deck.map((card) => {
              const isOpen = open.includes(card.uid) || matched.includes(card.pair);
              return (
                <button
                  key={card.uid}
                  type="button"
                  className={isOpen ? "memory-tile is-open" : "memory-tile"}
                  onClick={() => flip(card.uid)}
                  aria-label={isOpen ? card.label : "Hidden card"}
                  disabled={matched.includes(card.pair)}
                >
                  <span className="memory-face back">?</span>
                  <span className="memory-face front">
                    <Icon kind={card.draw} />
                  </span>
                </button>
              );
            })}
          </div>

          <p className="puzzle-status" aria-live="polite">
            {memoryDone ? `All matched in ${moves} moves. Clever.` : "Flip two at a time."}
          </p>
          <button type="button" className="btn secondary" onClick={resetMemory}>
            Shuffle again
          </button>
        </article>

        <article className={`puzzle-card lock-card${lockOpen ? " is-done" : ""}`}>
          <p className="kicker">Puzzle four</p>
          <h3>Open the date lock</h3>
          <p className="puzzle-help">{hint}</p>

          <div className="lock-display" aria-live="polite">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index} className={lock[index] ? "is-filled" : ""}>
                {lock[index] || "·"}
              </span>
            ))}
          </div>

          <div className="lock-pad">
            {"123456789".split("").map((digit) => (
              <button key={digit} type="button" onClick={() => pressDigit(digit)} disabled={lockOpen}>
                {digit}
              </button>
            ))}
            <button type="button" className="lock-wide" onClick={clearLock} disabled={lockOpen}>
              Clear
            </button>
            <button type="button" onClick={() => pressDigit("0")} disabled={lockOpen}>
              0
            </button>
          </div>

          {lockOpen && (
            <p className="lock-reward">
              12 · 02 · 2024
              <em>Ours.</em>
            </p>
          )}
        </article>

        <article className="puzzle-card riddle-card">
          <p className="kicker">Puzzle five</p>
          <h3>A Libra riddle</h3>
          <p className="riddle-text">
            I hang in the sky with two equal bowls. I am not a fish, not a lion, not twins. Venus keeps
            me company. What am I?
          </p>
          <Riddle />
        </article>
      </div>
    </Reveal>
  );
}

function Riddle() {
  const [guess, setGuess] = useState("");
  const [state, setState] = useState("idle");

  function check(event) {
    event.preventDefault();
    const value = guess.trim().toLowerCase();
    if (value.includes("libra") || value.includes("scale") || value === "♎") {
      setState("yes");
    } else {
      setState("no");
    }
  }

  return (
    <form className="riddle-form" onSubmit={check}>
      <input
        value={guess}
        onChange={(event) => {
          setGuess(event.target.value);
          setState("idle");
        }}
        placeholder="Your answer"
        aria-label="Riddle answer"
        autoComplete="off"
      />
      <button type="submit" className="btn">
        Guess
      </button>
      <p className="puzzle-status" aria-live="polite">
        {state === "yes" && "Yes. Libra — her sign, her sky."}
        {state === "no" && "Warm, but not yet. Think of her birthday month."}
        {state === "idle" && "Type a word. Or a symbol."}
      </p>
    </form>
  );
}
