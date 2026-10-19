import { AGE, birthLabel, config } from "../config";
import Atom from "./Atom";
import Countdown from "./Countdown";
import Floaters from "./Floaters";

export default function Cover({ countdown, onOpen }) {
  const locked = !countdown.canOpen;
  const name = config.herName.trim() || "Htet";

  function handleOpen() {
    // Hard guard: never open early, always open once unlocked
    if (!countdown.canOpen) return;
    onOpen();
  }

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
          {locked
            ? `For ${name}. Always in motion. Soft color. A day waiting to be opened.`
            : `Open it. ${name} is ${AGE}, and the day is hers.`}
        </p>
        <div className="cover-fade" style={{ "--d": "480ms" }}>
          <Countdown countdown={countdown} />
        </div>
        <button
          type="button"
          className={locked ? "cover-ribbon cover-fade is-locked" : "cover-ribbon cover-fade is-ready"}
          style={{ "--d": "600ms" }}
          onClick={handleOpen}
          disabled={locked}
          aria-disabled={locked}
          aria-label={
            locked ? "Journal locked. Opens when the countdown ends." : "Open the journal"
          }
        >
          <svg className="cover-ribbon-art" viewBox="0 0 340 100" aria-hidden="true">
            <defs>
              <linearGradient id="ribbonSatin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffd0de" />
                <stop offset="35%" stopColor="#ff8aab" />
                <stop offset="100%" stopColor="#b01d4a" />
              </linearGradient>
              <linearGradient id="bowFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffe4ec" />
                <stop offset="45%" stopColor="#ff9eb8" />
                <stop offset="100%" stopColor="#d12e66" />
              </linearGradient>
              <linearGradient id="bowDeep" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff8aab" />
                <stop offset="100%" stopColor="#9d1d45" />
              </linearGradient>
            </defs>
            {/* soft tails under the bow */}
            <path d="M152 52 C140 68 128 86 122 92 L152 76 Z" fill="url(#bowDeep)" opacity="0.95" />
            <path d="M188 52 C200 68 212 86 218 92 L188 76 Z" fill="url(#bowDeep)" opacity="0.95" />
            {/* satin banner with swallowtail ends */}
            <path
              d="M24 40 L42 56 L24 72 H316 L298 56 L316 40 Z"
              fill="url(#ribbonSatin)"
            />
            <path d="M52 45 H288" stroke="rgba(255,255,255,0.42)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M52 67 H288" stroke="rgba(110,18,48,0.2)" strokeWidth="1.5" strokeLinecap="round" />
            {/* left loop */}
            <path
              d="M170 34 C148 10 112 14 118 38 C122 54 148 56 170 42 Z"
              fill="url(#bowFront)"
            />
            <path d="M156 28 C140 18 124 24 128 38" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
            {/* right loop */}
            <path
              d="M170 34 C192 10 228 14 222 38 C218 54 192 56 170 42 Z"
              fill="url(#bowFront)"
            />
            <path d="M184 28 C200 18 216 24 212 38" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
            {/* knot */}
            <ellipse cx="170" cy="40" rx="13" ry="11" fill="#c22558" />
            <ellipse cx="170" cy="38" rx="7" ry="6" fill="#ffd5e2" />
          </svg>
          <span className="cover-ribbon-label">
            {locked ? (
              <>
                <span className="cover-open-full">Opens when the countdown ends</span>
                <span className="cover-open-short">Opens at midnight</span>
              </>
            ) : (
              "Open the journal"
            )}
          </span>
        </button>
        {!locked && (
          <p className="cover-ready-hint cover-fade" style={{ "--d": "720ms" }}>
            The wait is over — tap above.
          </p>
        )}
      </div>

      <p className="cover-foot">Pink · motion · Htet</p>
    </section>
  );
}
