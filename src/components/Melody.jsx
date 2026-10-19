import { useEffect, useRef, useState } from "react";

// Soft music-box loop in G major (not Happy Birthday — gentler, warmer)
const G3 = 196.0;
const A3 = 220.0;
const B3 = 246.94;
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const Fs4 = 369.99;
const G4 = 392.0;
const A4 = 440.0;
const B4 = 493.88;
const C5 = 523.25;
const D5 = 587.33;

// [freq, beats] — quiet waltz feel
const PHRASE = [
  [G4, 1],
  [B4, 1],
  [D5, 1],
  [B4, 1],
  [A4, 1],
  [G4, 1],
  [Fs4, 1],
  [D4, 1],
  [E4, 1],
  [G4, 1],
  [A4, 1],
  [B4, 1],
  [A4, 1.5],
  [G4, 0.5],
  [Fs4, 2],
  [G4, 1],
  [B4, 1],
  [D5, 1],
  [C5, 1],
  [B4, 1],
  [A4, 1],
  [G4, 1],
  [E4, 1],
  [D4, 1],
  [E4, 1],
  [G4, 1],
  [A4, 1],
  [Fs4, 1],
  [G4, 3],
];

const CHORDS = [
  [G3, B3, D4],
  [D4, Fs4, A4],
  [E4, G4, B4],
  [C4, E4, G4],
  [G3, B3, D4],
  [C4, E4, G4],
  [D4, Fs4, A4],
  [G3, B3, D4],
];

const BEAT = 0.52;
const GAP = 2.4;

function playBell(ctx, dest, freq, start, dur, peak = 0.22) {
  const osc = ctx.createOscillator();
  const partial = ctx.createOscillator();
  const gain = ctx.createGain();
  const partialGain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = freq;
  partial.type = "sine";
  partial.frequency.value = freq * 2.01;

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

  partialGain.gain.setValueAtTime(0.0001, start);
  partialGain.gain.exponentialRampToValueAtTime(peak * 0.28, start + 0.015);
  partialGain.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.85);

  osc.connect(gain);
  partial.connect(partialGain);
  gain.connect(dest);
  partialGain.connect(dest);
  osc.start(start);
  partial.start(start);
  osc.stop(start + dur + 0.05);
  partial.stop(start + dur + 0.05);
}

export default function Melody() {
  const [on, setOn] = useState(true);
  const [ready, setReady] = useState(false);
  const ctxRef = useRef(null);

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return undefined;

    const unlock = () => {
      if (!ctxRef.current) ctxRef.current = new AudioContext();
      ctxRef.current.resume().then(() => setReady(true));
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
    master.gain.value = 0.045;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2800;
    filter.Q.value = 0.5;
    master.connect(filter);
    filter.connect(ctx.destination);

    let alive = true;
    let timer = 0;

    const schedulePass = (startAt) => {
      let t = startAt;
      const phraseBeats = PHRASE.reduce((sum, [, b]) => sum + b, 0);
      const chordStep = (phraseBeats / CHORDS.length) * BEAT;

      CHORDS.forEach((notes, index) => {
        const when = startAt + index * chordStep;
        notes.forEach((freq, n) => {
          playBell(ctx, master, freq, when, chordStep * 1.35, 0.06 - n * 0.012);
        });
      });

      PHRASE.forEach(([freq, beats]) => {
        const dur = beats * BEAT;
        playBell(ctx, master, freq, t, Math.max(0.35, dur * 1.1), 0.2);
        t += dur;
      });

      return t;
    };

    const loop = () => {
      if (!alive) return;
      const end = schedulePass(ctx.currentTime + 0.06);
      const waitMs = Math.max(500, (end - ctx.currentTime + GAP) * 1000);
      timer = window.setTimeout(loop, waitMs);
    };

    loop();

    return () => {
      alive = false;
      window.clearTimeout(timer);
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.0001, now + 0.4);
    };
  }, [on, ready]);

  function toggle() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    ctxRef.current.resume().then(() => setReady(true));
    setOn((value) => !value);
  }

  return (
    <button
      type="button"
      className={on ? "melody is-on" : "melody"}
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Pause the music box" : "Play the music box"}
    >
      {on ? (
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
      <span className="melody-label">{on ? "Pause" : "Music box"}</span>
    </button>
  );
}
