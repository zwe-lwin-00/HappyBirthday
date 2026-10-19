import { useEffect, useRef, useState } from "react";

// Soft music-box Happy Birthday in C
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const F4 = 349.23;
const G4 = 392.0;
const A4 = 440.0;
const Bb4 = 466.16;
const C5 = 523.25;

const HAPPY_BIRTHDAY = [
  [C4, 0.75],
  [C4, 0.25],
  [D4, 1],
  [C4, 1],
  [F4, 1],
  [E4, 2],
  [C4, 0.75],
  [C4, 0.25],
  [D4, 1],
  [C4, 1],
  [G4, 1],
  [F4, 2],
  [C4, 0.75],
  [C4, 0.25],
  [C5, 1],
  [A4, 1],
  [F4, 1],
  [E4, 1],
  [D4, 2],
  [Bb4, 0.75],
  [Bb4, 0.25],
  [A4, 1],
  [F4, 1],
  [G4, 1],
  [F4, 2.5],
];

const BEAT = 0.5;
const GAP = 2.2;

function playBell(ctx, dest, freq, start, dur, peak = 0.18) {
  const osc = ctx.createOscillator();
  const sparkle = ctx.createOscillator();
  const gain = ctx.createGain();
  const sparkleGain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = freq;
  sparkle.type = "sine";
  sparkle.frequency.value = freq * 2.005;

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

  sparkleGain.gain.setValueAtTime(0.0001, start);
  sparkleGain.gain.exponentialRampToValueAtTime(peak * 0.22, start + 0.02);
  sparkleGain.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.8);

  osc.connect(gain);
  sparkle.connect(sparkleGain);
  gain.connect(dest);
  sparkleGain.connect(dest);
  osc.start(start);
  sparkle.start(start);
  osc.stop(start + dur + 0.04);
  sparkle.stop(start + dur + 0.04);
}

export default function Melody() {
  const [on, setOn] = useState(true);
  const [ready, setReady] = useState(false);
  const ctxRef = useRef(null);
  const readyRef = useRef(false);

  function markReady() {
    readyRef.current = true;
    setReady(true);
  }

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return undefined;

    const unlock = () => {
      if (!ctxRef.current) ctxRef.current = new AudioContext();
      ctxRef.current.resume().then(markReady);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  useEffect(() => {
    if (!on || !ready) return undefined;
    const ctx = ctxRef.current;
    if (!ctx) return undefined;

    const master = ctx.createGain();
    master.gain.value = 0.04;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2400;
    filter.Q.value = 0.55;
    master.connect(filter);
    filter.connect(ctx.destination);

    let alive = true;
    let timer = 0;

    const schedulePass = (startAt) => {
      let t = startAt;
      HAPPY_BIRTHDAY.forEach(([freq, beats]) => {
        const dur = beats * BEAT;
        playBell(ctx, master, freq, t, Math.max(0.32, dur * 1.05), 0.2);
        t += dur;
      });
      return t;
    };

    const loop = () => {
      if (!alive) return;
      const end = schedulePass(ctx.currentTime + 0.06);
      const waitMs = Math.max(400, (end - ctx.currentTime + GAP) * 1000);
      timer = window.setTimeout(loop, waitMs);
    };

    loop();

    return () => {
      alive = false;
      window.clearTimeout(timer);
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.0001, now + 0.35);
    };
  }, [on, ready]);

  function toggle() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    ctxRef.current.resume().then(markReady);

    // Browsers block sound until a click. First click should unlock + start,
    // not flip "Pause" into off (which needed a second click before).
    if (!readyRef.current) {
      setOn(true);
      return;
    }
    setOn((value) => !value);
  }

  const playing = on && ready;

  return (
    <button
      type="button"
      className={playing ? "melody is-on" : "melody"}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Pause Happy Birthday" : "Play Happy Birthday"}
    >
      {playing ? (
        <span className="melody-bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      ) : (
        <svg className="melody-note" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 18a3 3 0 1 1-2-2.83V5.5l11-2v9.67A3 3 0 1 1 16 16V6.4l-7 1.27V18z" fill="currentColor" />
        </svg>
      )}
      <span className="melody-label">{playing ? "Pause" : "Play"}</span>
    </button>
  );
}
