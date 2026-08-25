/**
 * PhoneFrame — a phone screenshot inside a CSS device bezel.
 *
 * Why this exists. Every other shape on the site is framed as the thing it
 * is: a browser shot gets a wide frame, the extension popup gets a narrow
 * panel. Phone shots were the exception, shown in the same generic rounded
 * rectangle as everything else — so a screenshot whose own status bar says
 * "this is a phone" sat in a card that said "this is a card". On a cream
 * canvas, a light app screen in that frame lost its edge entirely and the
 * band read as empty. (The ISIT site solved this the same way; this is that
 * component, adapted to the studio's tokens.)
 *
 * A bezel is a FRAME, not simulated UI — the ban in AGENTS is on inventing
 * product interface, and this invents none. It stops precisely there: no
 * notch, no side buttons, no speaker grille. Half our captures include a
 * status bar and half are cropped above it, so a drawn notch would land on
 * blank chrome in one app and on real content in the next — and a notch is
 * hardware the screenshot may not actually have. Frame, yes. Fake hardware
 * details, no.
 *
 * The bezel is `ink-surface`, NOT `ink`. They look identical in light mode
 * and that is the trap: `ink` is the text token, so it flips to near-white
 * under .dark and the phone would come back as a glowing white slab on a
 * dark page. `ink-surface` is the dark-block token and stays dark in both
 * themes, which is what a device bezel has to do.
 */
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";

interface PhoneFrameProps {
  image: StaticImageData;
  alt: string;
  /** Wrapper classes — width caps and offsets belong here. */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * Hero variant: the device rises out of the page and is cut off by
   * whatever sits below it, so the bezel loses its bottom edge and the shot
   * is cropped to `ratio` from the top. The whole point of the app hero (see
   * AppDetail) — the crop is always bottom-only, so the part of the screen
   * that identifies the app is never the part that goes missing.
   */
  ratio?: string;
}

export default function PhoneFrame({
  image,
  alt,
  className,
  sizes = "(max-width: 1024px) 45vw, 300px",
  priority,
  ratio,
}: PhoneFrameProps) {
  const cropped = ratio !== undefined;

  return (
    <div className={cn("relative", className)}>
      {/* A soft ground shadow, so the device sits on the page rather than
          floating over it. Inset from the edges: a shadow as wide as the
          device reads as a glow. A cropped device has no bottom to ground. */}
      {!cropped && (
        <div
          aria-hidden
          className="absolute inset-x-5 -bottom-1 h-8 rounded-[50%] bg-ink-surface/20 blur-2xl"
        />
      )}

      {/* The bezel. Thin — p-1.5 at this size is about the 8px a real phone
          shows, and anything heavier turns the product into a prop. */}
      <div
        className={cn(
          // The hairline is the device's highlight edge, and it is what keeps
          // a dark bezel from dissolving into the dark theme's canvas when
          // the app screen inside it happens to be dark too.
          "relative border border-white/10 bg-ink-surface p-1.5 sm:p-2",
          cropped
            ? "rounded-t-[2.25rem] border-b-0 pb-0 sm:rounded-t-[2.5rem]"
            : "rounded-[2.25rem] shadow-card sm:rounded-[2.5rem]"
        )}
      >
        <div
          className={cn(
            "overflow-hidden bg-sunken",
            cropped
              ? "rounded-t-[1.875rem] sm:rounded-t-[2.125rem]"
              : "rounded-[1.875rem] sm:rounded-[2.125rem]"
          )}
          style={cropped ? { aspectRatio: ratio, position: "relative" } : undefined}
        >
          <Image
            src={image}
            alt={alt}
            sizes={sizes}
            {...(cropped
              ? { fill: true, className: "object-cover object-top" }
              : { className: "h-auto w-full" })}
            priority={priority}
          />
        </div>
      </div>
    </div>
  );
}
