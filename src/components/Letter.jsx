import { useState } from "react";
import { config, letter } from "../config";
import Reveal from "./Reveal";

export default function Letter() {
  const [open, setOpen] = useState(false);
  const dear = config.herName.trim() || "Htet";
  const from = config.fromName.trim() || "Zwe";

  return (
    <Reveal as="section" className="band wrap" id="letter">
      <div className="section-head">
        <p className="kicker">Just for you</p>
        <h2>
          A letter, <em>sealed</em>
        </h2>
      </div>

      <div className={open ? "envelope is-open" : "envelope"}>
        {open ? (
          <article className="letter-sheet letter-open">
            <p className="kicker">20 October 2026</p>
            <h3>Dear {dear},</h3>
            {letter.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="sign">
              Yours,
              <strong>{from}</strong>
            </p>
            <button type="button" className="btn secondary" onClick={() => setOpen(false)}>
              Fold it closed
            </button>
          </article>
        ) : (
          <div className="sealed">
            <p>For Htet, on the day you turn 25.</p>
            <button type="button" className="seal" onClick={() => setOpen(true)}>
              <span className="wax" aria-hidden="true">
                25
              </span>
              Break the seal
            </button>
          </div>
        )}
      </div>
    </Reveal>
  );
}
