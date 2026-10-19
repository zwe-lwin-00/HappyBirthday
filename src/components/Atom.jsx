export default function Atom() {
  return (
    <svg className="atom" viewBox="0 0 200 200" aria-hidden="true">
      <g className="ring ring-a">
        <ellipse cx="100" cy="100" rx="74" ry="26" />
        <circle cx="174" cy="100" r="5" />
      </g>
      <g transform="rotate(60 100 100)">
        <g className="ring ring-b">
          <ellipse cx="100" cy="100" rx="74" ry="26" />
          <circle cx="26" cy="100" r="4.5" />
        </g>
      </g>
      <g transform="rotate(120 100 100)">
        <g className="ring ring-c">
          <ellipse cx="100" cy="100" rx="74" ry="26" />
          <circle cx="174" cy="100" r="4" />
        </g>
      </g>
      <path
        className="nucleus"
        d="M100 112c0 0-16-9.2-16-18.2 0-4.6 3.3-8.3 8-8.3 2.6 0 4.7 1.2 8 3.8 3.3-2.6 5.4-3.8 8-3.8 4.7 0 8 3.7 8 8.3C116 102.8 100 112 100 112z"
      />
    </svg>
  );
}
