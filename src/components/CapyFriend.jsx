import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const TRICKS = ["idle", "orange", "splash", "hearts", "wave"];

export default function CapyFriend() {
  const [trick, setTrick] = useState("idle");
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const blinkLoop = window.setInterval(() => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
    }, 2800);
    return () => window.clearInterval(blinkLoop);
  }, []);

  useEffect(() => {
    if (trick === "idle") return undefined;
    const id = window.setTimeout(() => setTrick("idle"), 1600);
    return () => window.clearTimeout(id);
  }, [trick]);

  function play() {
    const next = TRICKS.filter((item) => item !== "idle" && item !== trick);
    setTrick(next[Math.floor(Math.random() * next.length)]);
  }

  return (
    <Reveal as="section" className="band wrap" id="capy">
      <div className="section-head">
        <p className="kicker">A soft guest</p>
        <h2>
          Say <em>hello</em>
        </h2>
        <p>Tap the water. Something round and calm might do a little trick.</p>
      </div>

      <button
        type="button"
        className={`capy-stage is-${trick}${blink ? " is-blink" : ""}`}
        onClick={play}
        aria-label="Play with the capybara"
      >
        <span className="capy-sky" aria-hidden="true">
          <i className="capy-cloud c1" />
          <i className="capy-cloud c2" />
        </span>

        <svg className="capy-scene" viewBox="0 0 360 240" aria-hidden="true">
          <ellipse className="capy-pond" cx="180" cy="186" rx="150" ry="28" fill="#9ec9d8" />
          <ellipse className="capy-pond-shine" cx="150" cy="178" rx="54" ry="8" fill="#fff" opacity="0.28" />
          <g className="capy-ripples">
            <ellipse cx="180" cy="186" rx="70" ry="12" fill="none" stroke="#fff" strokeWidth="2" opacity="0.35" />
            <ellipse cx="180" cy="186" rx="100" ry="18" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.2" />
          </g>

          <g className="capy-body">
            <ellipse cx="190" cy="150" rx="78" ry="42" fill="#d4a574" />
            <ellipse cx="128" cy="136" rx="40" ry="34" fill="#e0b687" />
            <ellipse className="capy-ear left" cx="108" cy="118" rx="10" ry="13" fill="#c9925a" />
            <ellipse className="capy-ear right" cx="144" cy="114" rx="9" ry="12" fill="#c9925a" />
            <ellipse cx="108" cy="120" rx="4" ry="5" fill="#8a5a32" opacity="0.35" />
            <ellipse cx="144" cy="116" rx="3.5" ry="4.5" fill="#8a5a32" opacity="0.35" />

            <g className="capy-eyes">
              <ellipse className="eye-open" cx="118" cy="134" rx="4.2" ry="4.8" fill="#3a2414" />
              <ellipse className="eye-open" cx="142" cy="130" rx="4.2" ry="4.8" fill="#3a2414" />
              <path className="eye-shut" d="M113 134h10" stroke="#3a2414" strokeWidth="2.4" strokeLinecap="round" />
              <path className="eye-shut" d="M137 130h10" stroke="#3a2414" strokeWidth="2.4" strokeLinecap="round" />
              <circle className="eye-shine" cx="119.5" cy="132.5" r="1.2" fill="#fff" />
              <circle className="eye-shine" cx="143.5" cy="128.5" r="1.2" fill="#fff" />
            </g>

            <ellipse cx="130" cy="146" rx="6" ry="4.2" fill="#6b3f22" />
            <path d="M124 152c4 3.4 10 3.4 14 0" fill="none" stroke="#6b3f22" strokeWidth="1.8" strokeLinecap="round" />

            <g className="capy-hearts" fill="#e4376a">
              <path d="M112 112c0-4 3-6 6-4 1.5-3 5-2 5 2 0 4-5.5 8-5.5 8S112 116 112 112z" />
              <path d="M148 106c0-4 3-6 6-4 1.5-3 5-2 5 2 0 4-5.5 8-5.5 8S148 110 148 106z" />
              <path d="M130 98c0-5 4-7 7-5 2-4 6-2 6 3 0 5-6.5 10-6.5 10S130 103 130 98z" />
            </g>

            <g className="capy-paw">
              <ellipse cx="248" cy="168" rx="14" ry="10" fill="#c9925a" />
            </g>

            <g className="capy-orange">
              <circle cx="248" cy="126" r="18" fill="#f08a2a" />
              <circle cx="248" cy="126" r="14" fill="#ff9f3d" />
              <path d="M248 112c2-8 8-10 10-8" fill="none" stroke="#5e8f57" strokeWidth="2.4" strokeLinecap="round" />
              <ellipse cx="242" cy="120" rx="4" ry="2.5" fill="#fff" opacity="0.35" />
            </g>

            <path className="capy-tail" d="M260 148c16 4 24-6 28-18" fill="none" stroke="#c9925a" strokeWidth="10" strokeLinecap="round" />
            <ellipse className="capy-belly" cx="188" cy="158" rx="34" ry="18" fill="#f0d2ae" opacity="0.55" />
          </g>

          <g className="capy-splash">
            <circle cx="210" cy="176" r="4" fill="#fff" />
            <circle cx="230" cy="170" r="3" fill="#fff" />
            <circle cx="190" cy="168" r="2.5" fill="#fff" />
            <circle cx="250" cy="178" r="3.5" fill="#fff" />
          </g>
        </svg>

        <span className="capy-hint">
          {trick === "idle" && "Tap me"}
          {trick === "orange" && "Orange hat moment"}
          {trick === "splash" && "Tiny splash!"}
          {trick === "hearts" && "Soft hearts"}
          {trick === "wave" && "Slow hello"}
        </span>
      </button>
    </Reveal>
  );
}
