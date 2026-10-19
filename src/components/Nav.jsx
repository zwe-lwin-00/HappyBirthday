import { useEffect, useState } from "react";
import { NAV } from "../config";

function scrollToId(id) {
  const node = document.getElementById(id);
  if (!node) return false;
  node.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", `#${id}`);
  return true;
}

export default function Nav() {
  const [active, setActive] = useState(NAV[0][0]);

  useEffect(() => {
    const pick = () => {
      const line = 140;
      let current = NAV[0][0];
      NAV.forEach(([id]) => {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= line) current = id;
      });
      setActive(current);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && NAV.some(([id]) => id === hash)) {
      window.requestAnimationFrame(() => scrollToId(hash));
    }
  }, []);

  return (
    <div className="nav-wrap">
      <nav className="nav" aria-label="Birthday pages">
        {NAV.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "is-active" : undefined}
            aria-current={active === id ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              if (scrollToId(id)) setActive(id);
            }}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
