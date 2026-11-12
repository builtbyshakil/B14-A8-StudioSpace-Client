import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <svg
        viewBox="0 0 320 240"
        role="img"
        aria-label="A film clapperboard in front of a studio light on a tripod"
        className="h-56 w-auto"
      >
        <ellipse cx="160" cy="214" rx="130" ry="12" className="fill-base-300" />
        <g className="stroke-base-content" strokeWidth="6" strokeLinecap="round">
          <line x1="236" y1="96" x2="212" y2="210" />
          <line x1="236" y1="96" x2="260" y2="210" />
          <line x1="236" y1="96" x2="236" y2="214" />
        </g>
        <rect x="206" y="52" width="60" height="46" rx="8" className="fill-primary" />
        <circle cx="236" cy="75" r="13" className="fill-secondary" />
        <path d="M206 60 L174 42 L174 108 L206 90 Z" className="fill-base-content" />
        <g transform="rotate(-8 90 130)">
          <rect x="36" y="112" width="110" height="78" rx="6" className="fill-neutral" />
          <rect x="36" y="86" width="110" height="24" rx="4" className="fill-base-content" />
          <g className="fill-base-100">
            <polygon points="46,86 64,86 54,110 36,110" />
            <polygon points="76,86 94,86 84,110 66,110" />
            <polygon points="106,86 124,86 114,110 96,110" />
          </g>
          <text
            x="91"
            y="160"
            textAnchor="middle"
            fontSize="34"
            fontWeight="800"
            className="fill-neutral-content"
          >
            404
          </text>
        </g>
      </svg>

      <h1 className="mt-8 text-4xl font-extrabold">This scene was cut</h1>
      <p className="mt-3 max-w-md text-base-content/70">
        The page you are looking for does not exist or has been moved. Head back
        to the home page and find your next studio.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Return to Home
      </Link>
    </div>
  );
}
