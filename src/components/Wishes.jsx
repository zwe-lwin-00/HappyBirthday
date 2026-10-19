import { useState } from "react";
import { wishes } from "../config";
import Reveal from "./Reveal";

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.6l2.5 6.1 6.6.6-5 4.3 1.5 6.4L12 16.7 6.4 20l1.5-6.4-5-4.3 6.6-.6L12 2.6z" />
    </svg>
  );
}

export default function Wishes() {
  const [open, setOpen] = useState(null);
  const [read, setRead] = useState([]);
  const [pulse, setPulse] = useState(null);
  const current = open === null ? null : wishes[open];

  function choose(index) {
    setOpen(index);
    setPulse(index);
    setRead((currentRead) => (currentRead.includes(index) ? currentRead : [...currentRead, index]));
  }

  return (
    <Reveal as="section" className="sky" id="wishes">
      <div className="wrap">
        <div className="section-head light">
          <p className="kicker">One for every year</p>
          <h2>
            Twenty-five <em>wishes</em>
          </h2>
          <p>Tap a star. Leave it lit. The sky keeps count.</p>
        </div>

        <div className="sky-grid">
          {wishes.map((wish, index) => {
            const lit = read.includes(index);
            const selected = open === index;
            return (
              <button
                key={wish}
                type="button"
                className={[
                  "star",
                  selected ? "is-selected" : "",
                  lit ? "is-lit" : "",
                  pulse === index ? "is-pulse" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ "--d": `${(index % 5) * 40}ms` }}
                onClick={() => choose(index)}
                onAnimationEnd={() => setPulse((value) => (value === index ? null : value))}
                aria-pressed={selected}
                aria-label={`Wish ${index + 1}${lit ? ", read" : ""}`}
              >
                <Star />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <article className="wish-card" aria-live="polite" key={open ?? "empty"}>
          {current ? (
            <>
              <p className="kicker">Wish {String(open + 1).padStart(2, "0")}</p>
              <p className="wish-text">{current}</p>
            </>
          ) : (
            <p className="wish-text">The first star is year one. The last star is this one.</p>
          )}
          {read.length === wishes.length && (
            <p className="wish-done">All 25 are lit. That is the whole sky.</p>
          )}
        </article>
      </div>
    </Reveal>
  );
}
