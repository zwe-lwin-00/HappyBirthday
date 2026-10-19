import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { photos } from "../config";
import Reveal from "./Reveal";

const modules = import.meta.glob("../assets/images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  import: "default",
});

function resolveFromAssets(slot) {
  const match = Object.entries(modules).find(([path]) => {
    const file = path.split("/").pop() || "";
    const name = file.replace(/\.[^.]+$/, "");
    return name === String(slot);
  });
  return match ? match[1] : null;
}

function nextFilled(list, from, step) {
  if (!list.length) return from;
  let index = from;
  for (let i = 0; i < list.length; i += 1) {
    index = (index + step + list.length) % list.length;
    if (list[index]?.src) return index;
  }
  return from;
}

const WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

export default function Photos() {
  const ready = useMemo(
    () =>
      photos.map((item) => ({
        ...item,
        src: resolveFromAssets(item.slot),
      })),
    [],
  );
  const [active, setActive] = useState(null);
  const current = active === null ? null : ready[active];
  const filled = ready.filter((item) => item.src);
  const countWord = WORDS[filled.length - 1] || String(filled.length);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((i) => (i === null ? i : nextFilled(ready, i, 1)));
      if (event.key === "ArrowLeft") setActive((i) => (i === null ? i : nextFilled(ready, i, -1)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, ready]);

  return (
    <Reveal as="section" className="band wrap" id="photos">
      <div className="section-head">
        <p className="kicker">Frames</p>
        <h2>
          {filled.length ? (
            <>
              {countWord.charAt(0).toUpperCase() + countWord.slice(1)} little <em>windows</em>
            </>
          ) : (
            <>
              Little <em>windows</em>
            </>
          )}
        </h2>
        <p>
          {filled.length
            ? "Tap a frame. The room gets quieter for a second."
            : "Add her photos to src/assets/images as 1.jpg, 2.jpg, …"}
        </p>
      </div>

      <div className="photo-grid">
        {ready.map((item, index) => (
          <button
            key={item.slot}
            type="button"
            className={item.src ? "polaroid has-photo" : "polaroid is-empty"}
            style={{ "--rot": `${item.tilt}deg`, "--d": `${index * 70}ms` }}
            onClick={() => item.src && setActive(index)}
            disabled={!item.src}
          >
            <span className="polaroid-frame">
              {item.src ? (
                <img src={item.src} alt={item.alt} loading="lazy" />
              ) : (
                <span className="polaroid-empty">
                  <strong>{item.slot}</strong>
                  <em>Add {item.slot}.jpg</em>
                </span>
              )}
            </span>
            <span className="polaroid-cap">{item.caption}</span>
          </button>
        ))}
      </div>

      {current?.src &&
        createPortal(
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="lightbox-nav prev"
              aria-label="Previous photo"
              onClick={(event) => {
                event.stopPropagation();
                setActive((i) => nextFilled(ready, i, -1));
              }}
            >
              ‹
            </button>
            <figure className="lightbox-card" onClick={(event) => event.stopPropagation()}>
              <img src={current.src} alt={current.alt} />
              <figcaption>{current.caption}</figcaption>
            </figure>
            <button
              type="button"
              className="lightbox-nav next"
              aria-label="Next photo"
              onClick={(event) => {
                event.stopPropagation();
                setActive((i) => nextFilled(ready, i, 1));
              }}
            >
              ›
            </button>
            <button type="button" className="lightbox-close" aria-label="Close" onClick={() => setActive(null)}>
              ×
            </button>
          </div>,
          document.body,
        )}
    </Reveal>
  );
}
