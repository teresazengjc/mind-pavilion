type Props = { className?: string; size?: number };

export function PavilionMark({ className, size = 28 }: Props) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22 L32 8 L56 22" />
      <path d="M12 22 L12 44 M52 22 L52 44" />
      <path d="M20 44 L20 30 Q32 22 44 30 L44 44" />
      <path d="M6 48 H58" />
      <path d="M10 52 H54" opacity="0.5" />
      <circle cx="32" cy="36" r="2" opacity="0.6" />
    </svg>
  );
}
