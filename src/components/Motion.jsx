import { motionLines } from "../config";
import Reveal from "./Reveal";

export default function Motion() {
  const loop = [...motionLines, ...motionLines];

  return (
    <Reveal as="section" className="motion" id="motion">
      <div className="wrap motion-copy">
        <p className="kicker">Always moving</p>
        <h2>
          Built for <em>motion</em>
        </h2>
        <p>
          You treat sitting still as optional. Quick feet. Full laugh. The pace of someone whose
          favorite answer is “let’s go,” already halfway there.
        </p>
      </div>

      <div className="pulse-wrap" aria-hidden="true">
        <svg className="pulse" viewBox="0 0 600 80" preserveAspectRatio="none">
          <path d="M0 40H90l18-24 22 48 18-24h70l18-24 22 48 18-24h70l18-24 22 48 18-24H600" />
        </svg>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {loop.map((line, index) => (
            <span key={`${line}-${index}`}>{line}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
