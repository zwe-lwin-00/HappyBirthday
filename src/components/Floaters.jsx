function Ribbon({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 70" aria-hidden="true">
      <path
        d="M18 28c14-18 28-18 42 0 14 18 28 18 42 0"
        fill="none"
        stroke="#ff8aab"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M18 34c14-18 28-18 42 0 14 18 28 18 42 0"
        fill="none"
        stroke="#e4376a"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path d="M52 30l8 18-8-4-8 4z" fill="#ff8aab" />
      <path d="M68 30l8 18-8-4-8 4z" fill="#e4376a" />
      <ellipse cx="60" cy="30" rx="8" ry="6" fill="#ffb3c9" />
    </svg>
  );
}

function Tulip({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 72" aria-hidden="true">
      <path d="M24 70V34" stroke="#5e8f57" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 48c-10 1-14-8-7-14" fill="none" stroke="#5e8f57" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 28c-1-12 7-22 12-24 5 2 13 12 12 24-4-5-8-6-12-6s-8 1-12 6z" fill="#ff8aab" />
      <path d="M16 28c0-10 4-16 8-18 4 2 8 8 8 18-3-4-6-5-8-5s-5 1-8 5z" fill="#ffb3c9" />
    </svg>
  );
}

function Capy({ className }) {
  return (
    <svg className={`${className} floater-capy`} viewBox="0 0 84 52" aria-hidden="true">
      <g className="floater-capy-body">
        <ellipse cx="46" cy="30" rx="28" ry="16" fill="#d4a574" />
        <ellipse cx="24" cy="24" rx="14" ry="12" fill="#e0b687" />
        <ellipse cx="17" cy="20" rx="4" ry="5" fill="#c9925a" />
        <ellipse cx="30" cy="19" rx="3.5" ry="4.5" fill="#c9925a" />
        <circle className="floater-eye" cx="20" cy="25" r="1.5" fill="#3a2414" />
        <circle className="floater-eye" cx="29" cy="24" r="1.5" fill="#3a2414" />
        <ellipse cx="24" cy="29" rx="2.2" ry="1.6" fill="#6b3f22" />
        <path d="M66 28c8 1 12-4 14-10" stroke="#c9925a" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle className="floater-orange" cx="62" cy="18" r="7" fill="#ff9f3d" />
      </g>
    </svg>
  );
}

const ITEMS = [
  { Comp: Ribbon, className: "floater f-a" },
  { Comp: Tulip, className: "floater f-b" },
  { Comp: Capy, className: "floater f-c" },
  { Comp: Ribbon, className: "floater f-d" },
  { Comp: Tulip, className: "floater f-e" },
];

export default function Floaters() {
  return (
    <div className="floaters" aria-hidden="true">
      {ITEMS.map(({ Comp, className }) => (
        <Comp key={className} className={className} />
      ))}
    </div>
  );
}
