/**
 * PlaceholderBlock — stand-in artwork until real screenshots and photography
 * exist. Renders a grainy accent-tinted gradient block at a fixed aspect ratio
 * so layouts hold their shape when real images drop in later.
 */
import { cn } from "@/lib/cn";

type Ratio = "phone" | "browser" | "square" | "portrait" | "wide";

interface PlaceholderBlockProps {
  /** Optional caption shown in the centre of the block. */
  label?: string;
  ratio?: Ratio;
  /** Any CSS color. Defaults to the inherited accent token. */
  tint?: string;
  className?: string;
}

const RATIOS: Record<Ratio, string> = {
  phone: "aspect-[9/19.5]",
  browser: "aspect-[16/10]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  wide: "aspect-[21/9]",
};

export default function PlaceholderBlock({
  label,
  ratio = "browser",
  tint,
  className,
}: PlaceholderBlockProps) {
  const color = tint ?? "var(--color-accent)";

  return (
    <div
      className={cn(
        "grain relative overflow-hidden rounded-card border border-border",
        RATIOS[ratio],
        className
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, color-mix(in srgb, ${color} 34%, transparent), color-mix(in srgb, ${color} 10%, transparent) 55%, color-mix(in srgb, ${color} 26%, transparent))`,
        backgroundColor: "var(--color-surface-sunken)",
      }}
    >
      <div
        aria-hidden
        className="absolute -right-8 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{
          backgroundColor: `color-mix(in srgb, ${color} 40%, transparent)`,
        }}
      />
      {label && (
        <div className="absolute inset-0 z-10 grid place-items-center p-4">
          <span className="text-center text-[0.8125rem] font-medium text-ink/45">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
