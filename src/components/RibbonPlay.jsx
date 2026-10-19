import { useState } from "react";
import Reveal from "./Reveal";

export default function RibbonPlay() {
  const [tied, setTied] = useState(false);
  const [spark, setSpark] = useState(0);

  function tug() {
    setTied((value) => !value);
    setSpark((count) => count + 1);
  }

  return (
    <Reveal as="section" className="band wrap ribbon-play" id="orbit">
      <div className="section-head">
        <p className="kicker">Soft details</p>
        <h2>
          A little <em>orbit</em>
        </h2>
        <p>Pull the ribbon. Watch what drifts in with it.</p>
      </div>

      <button type="button" className={tied ? "orbit is-tied" : "orbit"} onClick={tug} aria-pressed={tied}>
        <span className="orbit-stage" key={spark}>
          <svg className="orbit-ribbon" viewBox="0 0 280 160" aria-hidden="true">
            <path
              className="ribbon-loop left"
              d="M140 78c-40-38-78-18-92 10-10 20 4 44 28 40 18-3 36-18 48-36"
              fill="none"
              stroke="#ff8aab"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              className="ribbon-loop right"
              d="M140 78c40-38 78-18 92 10 10 20-4 44-28 40-18-3-36-18-48-36"
              fill="none"
              stroke="#e4376a"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              className="ribbon-tail a"
              d="M140 78c-8 28-4 52 10 68"
              fill="none"
              stroke="#ff8aab"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              className="ribbon-tail b"
              d="M140 78c8 28 16 48 4 66"
              fill="none"
              stroke="#e4376a"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <ellipse className="ribbon-knot" cx="140" cy="78" rx="18" ry="14" fill="#ffb3c9" />
            <ellipse cx="140" cy="78" rx="10" ry="8" fill="#fff0f4" opacity="0.55" />
          </svg>

          <span className="orbit-petals">
            <i className="pet petal-1" />
            <i className="pet petal-2" />
            <i className="pet petal-3" />
          </span>

          <span className="orbit-capy" aria-hidden="true">
            <svg viewBox="0 0 84 52">
              <ellipse cx="46" cy="30" rx="28" ry="16" fill="#d4a574" />
              <ellipse cx="24" cy="24" rx="14" ry="12" fill="#e0b687" />
              <ellipse cx="17" cy="20" rx="4" ry="5" fill="#c9925a" />
              <ellipse cx="30" cy="19" rx="3.5" ry="4.5" fill="#c9925a" />
              <circle cx="20" cy="25" r="1.5" fill="#3a2414" />
              <circle cx="29" cy="24" r="1.5" fill="#3a2414" />
              <ellipse cx="24" cy="29" rx="2.2" ry="1.6" fill="#6b3f22" />
              <path d="M66 28c8 1 12-4 14-10" stroke="#c9925a" strokeWidth="5" strokeLinecap="round" fill="none" />
            </svg>
          </span>
        </span>
        <span className="orbit-hint">{tied ? "Tied. Tap again to loosen." : "Tap the ribbon"}</span>
      </button>
    </Reveal>
  );
}
