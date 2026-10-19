import { useEffect, useRef, useState } from "react";

function playWhoosh() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const duration = 0.55;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 900;
    const gain = ctx.createGain();
    gain.gain.value = 0.12;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
    window.setTimeout(() => ctx.close(), 800);
  } catch {
    // ignore
  }
}

function playChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const start = ctx.currentTime + index * 0.12;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.08, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.75);
    });
    window.setTimeout(() => ctx.close(), 1600);
  } catch {
    // ignore
  }
}

function Candle({ x, label, out, lean, dim }) {
  const blowing = !out && dim > 0.02;
  const scale = Math.max(0.2, 1 - dim * 0.8);
  return (
    <g className={out ? "candle is-out" : "candle"} transform={`translate(${x} 0)`}>
      {out && (
        <g className="smoke" aria-hidden="true">
          <circle className="smoke-p s1" cx="-2" cy="62" r="5" fill="rgba(180,180,190,0.55)" />
          <circle className="smoke-p s2" cx="8" cy="48" r="4" fill="rgba(180,180,190,0.45)" />
          <circle className="smoke-p s3" cx="2" cy="34" r="3" fill="rgba(180,180,190,0.35)" />
        </g>
      )}
      <rect x="-9" y="96" width="18" height="58" rx="5" fill="#fffaf8" />
      <rect x="-9" y="96" width="18" height="8" rx="2" fill="#ffd0de" />
      <line x1="0" y1="88" x2="0" y2="96" stroke="#c9a27a" strokeWidth="1.6" strokeLinecap="round" />
      <text x="0" y="132" textAnchor="middle" className="candle-num">
        {label}
      </text>
      {!out && (
        <g
          className={blowing ? "flame is-blowing" : "flame"}
          style={
            blowing
              ? {
                  transform: `translateY(${dim * 6}px) rotate(${lean}deg) scale(${scale})`,
                  opacity: 1 - dim * 0.4,
                }
              : undefined
          }
        >
          <ellipse className="flame-glow" cx="0" cy="78" rx="16" ry="20" fill="#ffb703" opacity="0.22" />
          <path d="M0 54c7 7 9 14 0 28c-9-14-7-21 0-28z" fill="#ff9f1c" />
          <path d="M0 58c6 6 8 12 0 22c-8-10-6-16 0-22z" fill="#ffb703" />
          <path d="M0 70c2.4 2 3.2 5 0 9c-3.2-4-2.4-7 0-9z" fill="#fff6d8" />
        </g>
      )}
    </g>
  );
}

export default function Cake({ onCelebrate }) {
  const [phase, setPhase] = useState("lit");
  const [power, setPower] = useState(0);
  const holdRef = useRef(null);
  const timers = useRef([]);
  const doneRef = useRef(false);
  const powerRef = useRef(0);
  const phaseRef = useRef("lit");

  const out = phase === "out" || phase === "celebrate";
  const celebrating = phase === "celebrate";
  const lean = power * 28;

  useEffect(
    () => () => {
      window.clearInterval(holdRef.current);
      timers.current.forEach((id) => window.clearTimeout(id));
    },
    [],
  );

  function setPhaseSafe(next) {
    phaseRef.current = next;
    setPhase(next);
  }

  function clearHold() {
    window.clearInterval(holdRef.current);
    holdRef.current = null;
  }

  function finishBlow() {
    if (doneRef.current) return;
    doneRef.current = true;
    clearHold();
    powerRef.current = 1;
    setPower(1);
    setPhaseSafe("out");
    playWhoosh();
    onCelebrate();

    timers.current.push(
      window.setTimeout(() => {
        powerRef.current = 0;
        setPower(0);
      }, 150),
      window.setTimeout(() => {
        setPhaseSafe("celebrate");
        playChime();
        onCelebrate();
      }, 800),
    );
  }

  function startBlow(event) {
    event.preventDefault();
    if (doneRef.current) return;
    if (phaseRef.current !== "lit" && phaseRef.current !== "blowing") return;

    setPhaseSafe("blowing");
    clearHold();
    holdRef.current = window.setInterval(() => {
      if (doneRef.current) {
        clearHold();
        return;
      }
      powerRef.current = Math.min(1, powerRef.current + 0.045);
      setPower(powerRef.current);
      if (powerRef.current >= 1) finishBlow();
    }, 40);
  }

  function cancelBlow() {
    if (doneRef.current) return;
    if (phaseRef.current !== "blowing") return;
    clearHold();
    powerRef.current = 0;
    setPower(0);
    setPhaseSafe("lit");
  }

  function relight() {
    doneRef.current = false;
    clearHold();
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    powerRef.current = 0;
    setPower(0);
    setPhaseSafe("lit");
  }

  return (
    <section className={`band wrap cake-section${celebrating ? " is-party" : ""}`} id="cake">
      <div className="section-head">
        <p className="kicker">Last page</p>
        <h2>
          Make a <em>wish</em>
        </h2>
        <p>Hold the button and blow. Keep going until both flames give in.</p>
      </div>

      <div
        className={[
          "cake-stage",
          phase === "blowing" ? "is-blowing" : "",
          out ? "is-out" : "",
          celebrating ? "is-celebrate" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {celebrating && (
          <div className="party-banner" aria-live="polite">
            <span>Happy birthday, Htet</span>
          </div>
        )}

        <div className="cake-glow" aria-hidden="true" />

        <div className="cake-visual">
          <svg
            className="cake"
            viewBox="0 0 420 360"
            role="img"
            aria-label="A pink birthday cake with candles shaped as 2 and 5"
          >
            <defs>
              <radialGradient id="roomGlow" cx="50%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#ffd0a8" stopOpacity={out ? 0 : 0.55} />
                <stop offset="100%" stopColor="#ffd0a8" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse className="candle-room" cx="210" cy="120" rx="120" ry="70" fill="url(#roomGlow)" />
            <ellipse cx="210" cy="328" rx="156" ry="16" fill="#f3d3de" />
            <path d="M68 212h284v78c0 24-48 42-142 42S68 314 68 290V212z" fill="#ffc9d8" />
            <ellipse cx="210" cy="212" rx="142" ry="28" fill="#ffb7cc" />
            <path d="M116 164h188v46c0 16-30 28-94 28s-94-12-94-28v-46z" fill="#ff8aab" />
            <ellipse cx="210" cy="164" rx="94" ry="22" fill="#ff9eb8" />
            <ellipse cx="186" cy="158" rx="36" ry="8" fill="#fff" opacity="0.28" />
            <g fill="#e0a24a">
              <rect x="118" y="246" width="9" height="3" rx="1" transform="rotate(-20 118 246)" />
              <rect x="168" y="268" width="9" height="3" rx="1" transform="rotate(18 168 268)" />
              <rect x="214" y="258" width="9" height="3" rx="1" transform="rotate(-8 214 258)" />
              <rect x="262" y="242" width="9" height="3" rx="1" transform="rotate(14 262 242)" />
              <rect x="300" y="264" width="9" height="3" rx="1" transform="rotate(-16 300 264)" />
            </g>
            <g transform="translate(148 134)">
              <path d="M10 28V14" stroke="#5e8f57" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 14c-1-8 5-14 8-16 3 2 9 8 8 16-3-3-6-4-8-4s-5 1-8 4z" fill="#ff8aab" />
              <path d="M5 14c0-6 3-10 5-11 2 1 5 5 5 11-2-2-4-3-5-3s-3 1-5 3z" fill="#ffb3c9" />
            </g>
            <g transform="translate(252 136)">
              <path d="M10 28V14" stroke="#5e8f57" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 14c-1-8 5-14 8-16 3 2 9 8 8 16-3-3-6-4-8-4s-5 1-8 4z" fill="#e4376a" />
              <path d="M5 14c0-6 3-10 5-11 2 1 5 5 5 11-2-2-4-3-5-3s-3 1-5 3z" fill="#ff8aab" />
            </g>

            <Candle x={188} label="2" out={out} lean={-lean} dim={power} />
            <Candle x={236} label="5" out={out} lean={lean * 0.85} dim={power} />

            {phase === "blowing" && (
              <g className="breath" fill="none" stroke="#e4376a" strokeLinecap="round" opacity={0.25 + power * 0.4}>
                <path className="breath-line b1" d="M20 110c50-18 70 20 120 4" strokeWidth={2 + power * 3} />
                <path className="breath-line b2" d="M12 136c58-14 78 22 132 2" strokeWidth={2 + power * 3} />
                <path className="breath-line b3" d="M28 158c46-10 68 18 110 0" strokeWidth={1.5 + power * 2.5} />
              </g>
            )}

            {celebrating && (
              <g className="sparkles" fill="#fff6d8">
                <circle className="sp s-a" cx="96" cy="96" r="3" />
                <circle className="sp s-b" cx="320" cy="88" r="2.5" />
                <circle className="sp s-c" cx="210" cy="70" r="3.5" />
                <circle className="sp s-d" cx="140" cy="80" r="2" />
                <circle className="sp s-e" cx="280" cy="74" r="2.2" />
              </g>
            )}
          </svg>
        </div>

        {(phase === "lit" || phase === "blowing") && (
          <div className="blow-meter" aria-hidden="true">
            <span className="blow-meter-fill" style={{ width: `${power * 100}%` }} />
          </div>
        )}

        <div className="cake-actions">
          {(phase === "lit" || phase === "blowing") && (
            <button
              type="button"
              className={`btn blow-btn${phase === "blowing" ? " is-holding" : ""}`}
              onPointerDown={startBlow}
              onPointerUp={cancelBlow}
              onPointerCancel={cancelBlow}
              onContextMenu={(event) => event.preventDefault()}
            >
              {phase === "blowing" ? "Keep blowing…" : "Hold to blow"}
            </button>
          )}
          {phase === "out" && (
            <p className="wish-made" aria-live="polite">
              The room goes quiet for a second…
            </p>
          )}
          {celebrating && (
            <>
              <p className="wish-made celebrate-copy" aria-live="polite">
                Happy birthday, Htet. The wish is yours now.
              </p>
              <p className="party-sub">I already made mine.</p>
              <button type="button" className="btn secondary" onClick={relight}>
                Light them again
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
