import { useState } from "react";
import { config } from "./config";
import { useCountdown } from "./hooks/useCountdown";
import Cake from "./components/Cake";
import CapyFriend from "./components/CapyFriend";
import Confetti from "./components/Confetti";
import Cover from "./components/Cover";
import Elements from "./components/Elements";
import Hero from "./components/Hero";
import Letter from "./components/Letter";
import Libra from "./components/Libra";
import Melody from "./components/Melody";
import Motion from "./components/Motion";
import Nav from "./components/Nav";
import Photos from "./components/Photos";
import Puzzles from "./components/Puzzles";
import Reaction from "./components/Reaction";
import RibbonPlay from "./components/RibbonPlay";
import Wishes from "./components/Wishes";

export default function App() {
  const countdown = useCountdown();
  const [opened, setOpened] = useState(false);
  const [burst, setBurst] = useState(0);
  const her = config.herFullName.trim() || config.herName.trim();
  const from = config.fromName.trim();

  return (
    <>
      <Confetti burst={burst} />
      <Melody />
      {opened ? (
        <div className="journal">
          <a className="skip" href="#hello">
            Skip to the top
          </a>
          <Nav />
          <Hero countdown={countdown} />
          <Photos />
          <Elements />
          <RibbonPlay />
          <CapyFriend />
          <Libra />
          <Puzzles />
          <Reaction />
          <Motion />
          <Wishes />
          <Letter />
          <Cake onCelebrate={() => setBurst((count) => count + 1)} />
          <footer className="colophon">
            <p>20 October 2001 — 20 October 2026 · Ours since 12 February 2024</p>
            <p>
              {`For ${her || "Htet Kay Zin Linn"}${from ? `, from ${from}` : ""}. `}
              Happy 25th.
            </p>
          </footer>
        </div>
      ) : (
        <Cover
          countdown={countdown}
          onOpen={() => {
            setOpened(true);
            setBurst((count) => count + 1);
            window.scrollTo(0, 0);
          }}
        />
      )}
    </>
  );
}
