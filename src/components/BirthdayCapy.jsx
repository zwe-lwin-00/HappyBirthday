export default function BirthdayCapy() {
  return (
    <svg
      className="birthday-capy"
      viewBox="0 0 280 200"
      role="img"
      aria-label="A birthday capybara with a party hat"
    >
      <defs>
        <linearGradient id="bdayHat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd0de" />
          <stop offset="50%" stopColor="#ff8aab" />
          <stop offset="100%" stopColor="#c22558" />
        </linearGradient>
      </defs>

      <ellipse cx="140" cy="186" rx="100" ry="12" fill="#f3d3de" />

      {/* Same silhouette as the Capy section — long body, blunt head */}
      <g transform="translate(-20 -20) scale(0.92)">
        <ellipse cx="190" cy="150" rx="78" ry="42" fill="#d4a574" />
        <ellipse cx="188" cy="158" rx="34" ry="18" fill="#f0d2ae" opacity="0.55" />
        <ellipse cx="128" cy="136" rx="40" ry="34" fill="#e0b687" />

        <ellipse cx="108" cy="118" rx="10" ry="13" fill="#c9925a" />
        <ellipse cx="144" cy="114" rx="9" ry="12" fill="#c9925a" />
        <ellipse cx="108" cy="120" rx="4" ry="5" fill="#8a5a32" opacity="0.35" />
        <ellipse cx="144" cy="116" rx="3.5" ry="4.5" fill="#8a5a32" opacity="0.35" />

        <ellipse cx="118" cy="134" rx="4.2" ry="4.8" fill="#3a2414" />
        <ellipse cx="142" cy="130" rx="4.2" ry="4.8" fill="#3a2414" />
        <circle cx="119.5" cy="132.5" r="1.2" fill="#fff" />
        <circle cx="143.5" cy="128.5" r="1.2" fill="#fff" />

        <ellipse cx="130" cy="146" rx="6" ry="4.2" fill="#6b3f22" />
        <path
          d="M124 152c4 3.4 10 3.4 14 0"
          fill="none"
          stroke="#6b3f22"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <ellipse cx="168" cy="178" rx="14" ry="9" fill="#c9925a" />
        <ellipse cx="210" cy="176" rx="14" ry="9" fill="#c9925a" />
        <path
          d="M260 148c16 4 24-6 28-18"
          fill="none"
          stroke="#c9925a"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </g>

      {/* party hat sits on the flat head */}
      <g transform="translate(78 48)">
        <path d="M18 42 L36 -8 L54 42 Z" fill="url(#bdayHat)" />
        <ellipse cx="36" cy="42" rx="20" ry="5.5" fill="#ff8aab" />
        <circle cx="36" cy="-10" r="6.5" fill="#ffe4ec" />
        <circle cx="36" cy="-10" r="3" fill="#fff" opacity="0.8" />
        <circle cx="28" cy="18" r="2.2" fill="#fff6d8" />
        <circle cx="42" cy="26" r="1.8" fill="#fff6d8" />
      </g>

      {/* tiny pink bow near chest */}
      <g transform="translate(148 118)">
        <path d="M0 0c-8-1-12 6-9 10 4-1 7-3 9-6 2 3 5 5 9 6 3-4-1-11-9-10z" fill="#ff8aab" />
        <circle cx="0" cy="1" r="3" fill="#e4376a" />
      </g>

      <g className="birthday-capy-bits">
        <path
          d="M218 58c0-4 3-6 6-4 1.5-3 5-2 5 2 0 4-5.5 8-5.5 8S218 62 218 58z"
          fill="#e4376a"
        />
        <path
          d="M236 48c0-3.5 2.5-5 5-3.5 1.2-2.5 4-1.8 4 1.8 0 3.5-4.5 7-4.5 7S236 51.5 236 48z"
          fill="#ff8aab"
        />
        <text x="214" y="108" className="birthday-capy-25">
          25
        </text>
      </g>
    </svg>
  );
}
