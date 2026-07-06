export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[420px]"
    >
      <ellipse cx="210" cy="230" rx="190" ry="60" fill="#EEECFB" />
      {/* Laptop base */}
      <rect x="70" y="60" width="230" height="150" rx="14" fill="#1E1B2E" />
      <rect x="84" y="74" width="202" height="112" rx="4" fill="var(--brand)" />
      {/* chart line */}
      <polyline
        points="100,150 130,120 160,160 190,110 220,135 250,95 270,120"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.9"
      />
      <circle cx="100" cy="90" r="3" fill="white" opacity="0.6" />
      <circle cx="112" cy="90" r="3" fill="white" opacity="0.6" />
      <circle cx="124" cy="90" r="3" fill="white" opacity="0.6" />
      <rect x="40" y="215" width="340" height="10" rx="5" fill="#D8D4F5" />
      {/* code chip */}
      <rect
        x="255"
        y="150"
        width="86"
        height="70"
        rx="12"
        fill="white"
        stroke="#E7E5F5"
        strokeWidth="1.5"
      />
      <text
        x="298"
        y="192"
        textAnchor="middle"
        fontSize="20"
        fontFamily="monospace"
        fill="var(--brand)"
        fontWeight="700"
      >
        {"</>"}
      </text>
      <circle cx="45" cy="70" r="4" fill="#C9C3F2" />
      <circle cx="365" cy="185" r="5" fill="#C9C3F2" />
      <circle cx="380" cy="90" r="3" fill="#C9C3F2" />
    </svg>
  );
}
