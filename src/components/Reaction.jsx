import { useId, useState } from "react";
import { reagents } from "../config";
import Reveal from "./Reveal";

const LIQUIDS = {
  1: "#ff8aab",
  2: "#ee7d86",
  3: "#e4376a",
};

export default function Reaction() {
  const rawId = useId().replace(/:/g, "");
  const clipId = `flask-${rawId}`;
  const [poured, setPoured] = useState([]);
  const done = poured.length === reagents.length;

  function pour(id) {
    setPoured((current) => (current.includes(id) ? current : [...current, id]));
  }

  return (
    <Reveal as="section" className="band wrap" id="lab">
      <div className="section-head">
        <p className="kicker">A little mix</p>
        <h2>
          Pink + curiosity + <em>motion</em>
        </h2>
        <p>Three things that feel like you. Pour them in. Watch what blooms.</p>
      </div>

      <div className="lab">
        <div className="vials">
          {reagents.map((item) => {
            const used = poured.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                className={used ? "vial is-used" : "vial"}
                onClick={() => pour(item.id)}
                disabled={used}
              >
                <span className={`vial-glass tone-${item.id}`} aria-hidden="true" />
                <span className="vial-copy">
                  <strong>{item.name}</strong>
                  <em>{item.amount}</em>
                  <span>{used ? "In the flask." : item.detail}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className={done ? "bench is-done" : "bench"}>
          <svg className="flask" viewBox="0 0 140 180" aria-hidden="true">
            <defs>
              <clipPath id={clipId}>
                <ellipse cx="70" cy="122" rx="46" ry="42" />
              </clipPath>
            </defs>
            <g clipPath={`url(#${clipId})`}>
              <rect
                className="liquid"
                x="16"
                y={[176, 146, 116, 84][poured.length]}
                width="108"
                height="90"
                fill={LIQUIDS[poured.length] || "transparent"}
              />
              {done && (
                <g className="bubbles">
                  <circle cx="58" cy="118" r="4" />
                  <circle cx="78" cy="104" r="3" />
                  <circle cx="66" cy="128" r="2.4" />
                  <circle cx="84" cy="122" r="2.2" />
                </g>
              )}
            </g>
            <path
              d="M57 84V22h26v62"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M50 22h40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="70" cy="122" rx="46" ry="42" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>

          <div className="result" aria-live="polite">
            {done ? (
              <>
                <p className="kicker">Result</p>
                <h3>You, at twenty-five</h3>
                <p>
                  Pink. Curious. In motion. The reaction is stable, warm, and a little explosive.
                  Safe to repeat every day.
                </p>
                <button type="button" className="btn secondary" onClick={() => setPoured([])}>
                  Run it again
                </button>
              </>
            ) : (
              <>
                <p className="kicker">Almost you</p>
                <h3>
                  {poured.length === 0
                    ? "The flask is waiting"
                    : poured.length === 1
                      ? "One in. Two to go."
                      : "Two in. One more."}
                </h3>
                <p>Pink, curiosity, and motion — pour them all, and see what you make.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
