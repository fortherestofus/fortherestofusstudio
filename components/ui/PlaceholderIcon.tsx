interface PlaceholderIconProps {
  color: string; // app accent color
  label: string; // app name
  size?: number;
  className?: string;
}

// Drop-in placeholder until real icons land in /public/icons.
// Swap with next/image <Image> using the same dimensions.
export default function PlaceholderIcon({
  color,
  label,
  size = 64,
  className = "",
}: PlaceholderIconProps) {
  const initial = label.trim().charAt(0).toUpperCase();

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl font-display font-semibold text-white ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.42,
        boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.18)`,
      }}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}
