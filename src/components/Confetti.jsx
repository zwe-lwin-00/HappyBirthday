import { useEffect, useRef } from "react";

const COLORS = ["#e4376a", "#ff8aab", "#ffd0de", "#e0a24a", "#fffdfb", "#9d1d45"];

function spawn(width) {
  return {
    x: Math.random() * width,
    y: -24 - Math.random() * 240,
    vx: -1.1 + Math.random() * 2.2,
    vy: 1.4 + Math.random() * 2.6,
    w: 6 + Math.random() * 8,
    h: 8 + Math.random() * 12,
    rot: Math.random() * Math.PI,
    vr: -0.18 + Math.random() * 0.36,
    round: Math.random() > 0.55,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export default function Confetti({ burst }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!burst) return undefined;
    const canvas = ref.current;
    if (!canvas) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(260, Math.floor(width / 4.5));
    const parts = Array.from({ length: count }, () => {
      const part = spawn(width);
      if (Math.random() > 0.55) {
        part.y = height * 0.35 + Math.random() * 80;
        part.vy = -4 - Math.random() * 5;
        part.vx = -3 + Math.random() * 6;
      }
      return part;
    });
    const start = performance.now();
    let frame = 0;
    let alive = true;

    const draw = (time) => {
      if (!alive) return;
      const elapsed = time - start;
      ctx.clearRect(0, 0, width, height);
      parts.forEach((part) => {
        part.y += part.vy;
        part.x += part.vx;
        part.vy += 0.045;
        part.rot += part.vr;
        ctx.save();
        ctx.translate(part.x, part.y);
        ctx.rotate(part.rot);
        ctx.globalAlpha = Math.max(0, 1 - elapsed / 5200);
        ctx.fillStyle = part.color;
        if (part.round) {
          ctx.beginPath();
          ctx.arc(0, 0, part.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-part.w / 2, -part.h / 2, part.w, part.h);
        }
        ctx.restore();
      });
      if (elapsed < 5300) frame = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, width, height);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
    };
  }, [burst]);

  return <canvas ref={ref} className="confetti" aria-hidden="true" />;
}
