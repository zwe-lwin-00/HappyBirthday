import { useState } from "react";
import { elements } from "../config";
import Reveal from "./Reveal";

export default function Elements() {
  const [symbol, setSymbol] = useState(elements[0].symbol);
  const current = elements.find((item) => item.symbol === symbol) ?? elements[0];

  return (
    <Reveal as="section" className="band wrap" id="elements">
      <div className="section-head">
        <p className="kicker">A smaller periodic table</p>
        <h2>
          The elements of <em>you</em>
        </h2>
        <p>Twelve real elements, chosen because they feel like Htet. Tap one and read the note.</p>
      </div>

      <div className="element-grid" role="tablist" aria-label="Elements of Htet">
        {elements.map((item, index) => {
          const selected = item.symbol === current.symbol;
          return (
            <button
              key={item.symbol}
              type="button"
              role="tab"
              id={`element-${item.symbol}`}
              className={selected ? "element is-selected" : "element"}
              style={{ "--d": `${index * 35}ms` }}
              aria-selected={selected}
              aria-controls="element-reader"
              onClick={() => setSymbol(item.symbol)}
            >
              <span className="element-n">{item.n}</span>
              <span className="element-sym">{item.symbol}</span>
              <span className="element-name">{item.name}</span>
            </button>
          );
        })}
      </div>

      <article className="element-reader" id="element-reader" role="tabpanel" aria-labelledby={`element-${current.symbol}`} key={current.symbol}>
        <p className="element-reader-n">Atomic number {current.n}</p>
        <p className="element-reader-sym">{current.symbol}</p>
        <h3>{current.name}</h3>
        <p>{current.note}</p>
      </article>
    </Reveal>
  );
}
