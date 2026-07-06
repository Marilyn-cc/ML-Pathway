export default function XMark({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.9 10.4 21 2.5h-2.1l-6.15 6.85L7.9 2.5H2.5l7.44 10.6L2.5 21.5h2.1l6.5-7.24 5.14 7.24h5.4l-7.74-11.1Zm-2.3 2.56-.75-1.06L5.1 4h2.5l4.8 6.76.75 1.06 6.5 9.15h-2.5l-5.55-7.96Z" />
    </svg>
  );
}
