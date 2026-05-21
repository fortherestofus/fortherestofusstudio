import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface PlaceholderImageProps {
  /** When set, the real image is shown instead of the placeholder.
   *  Drop the file in /public and pass its path, e.g. "/screenshots/foo.png". */
  src?: string;
  alt: string;
  /** Caption shown on the empty placeholder state. */
  label?: string;
  /** Tint used for the placeholder gradient + icon (defaults to brand lime). */
  accentColor?: string;
  /** next/image sizes hint for responsive loading. */
  sizes?: string;
  /** Controls aspect ratio / sizing, e.g. "aspect-[16/10]" or "aspect-[4/5]". */
  className?: string;
  /** Corner radius utility, e.g. "rounded-2xl". */
  rounded?: string;
}

/**
 * Drop-in image slot. Renders a styled, on-brand placeholder until a real
 * image path is supplied via `src` — then it swaps to the actual image with
 * no other code changes.
 */
export default function PlaceholderImage({
  src,
  alt,
  label = "Image coming soon",
  accentColor = "#90A842",
  sizes = "(max-width: 768px) 100vw, 33vw",
  className = "aspect-[16/10]",
  rounded = "rounded-2xl",
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative overflow-hidden border border-border bg-surface ${rounded} ${className}`}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${accentColor}24, ${accentColor}0a)`,
          }}
          aria-hidden="true"
        >
          <ImageIcon className="h-6 w-6" style={{ color: accentColor }} />
          <span
            className="text-[10px] font-medium uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
