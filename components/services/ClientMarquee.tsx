"use client";

/**
 * ClientMarquee — the organisations we have delivered work for, as a slow
 * continuous rail of names.
 *
 * Typographic, not logos. It carried the real marks until Alroy pointed out
 * what they actually looked like in a 44px row: several of these companies
 * only publish a dense horizontal lockup or a dark square, so at that height
 * Jenna Clifford read as a black box, Thrifty and Digify as illegible smudges,
 * and African Agri Council as three coloured dots. A wall of marks that cannot
 * be read is worse than the names, and the site is type-led anyway — this
 * matches the wordmark rather than fighting it.
 *
 * Names still come from lib/testimonials, so a logo file can never disagree
 * with the record. Organisation marks survive in exactly one place: beside a
 * testimonial, at 64px, where they are legible and identify the speaker.
 *
 * Headed "Work delivered for", not "trusted by": these are engagements, not
 * endorsements (AGENTS.md). The rail is duplicated once and translated by
 * exactly half its width, so the seam is invisible. Under reduced motion it
 * stops and becomes a plain wrapped list.
 */
import { useReducedMotion } from "framer-motion";
import { clients } from "@/lib/testimonials";
import { cn } from "@/lib/cn";

function Name({ name }: { name: string }) {
  return (
    <span className="shrink-0 whitespace-nowrap text-[1.25rem] font-medium tracking-[-0.015em] text-ink sm:text-[1.5rem]">
      {name}
    </span>
  );
}

/** The one live moment in an otherwise monotone rail. */
function Dot() {
  return (
    <span
      aria-hidden
      className="h-1.5 w-1.5 shrink-0 self-center rounded-full bg-accent"
    />
  );
}

/**
 * Closes each pass of the rail, the same way the tool rail does: the list is
 * real engagements, not the whole record. Set smaller and fainter than the
 * names so it reads as an aside, not another client.
 */
function AndMore() {
  return (
    <span className="shrink-0 self-center whitespace-nowrap text-[0.875rem] uppercase tracking-[0.14em] text-faint">
      and more
    </span>
  );
}

export default function ClientMarquee({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <ul className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
        {clients.map((name) => (
          <li key={name}>
            <Name name={name} />
          </li>
        ))}
        <li>
          <AndMore />
        </li>
      </ul>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        // Fade the ends so names enter and leave rather than snapping off.
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
    >
      <div className="flex w-max animate-marquee items-center gap-6 hover:[animation-play-state:paused] sm:gap-8">
        {[0, 1].map((pass) => (
          <span key={pass} className="flex items-center gap-6 sm:gap-8">
            {clients.map((name) => (
              <span
                key={`${pass}-${name}`}
                className="flex items-center gap-6 sm:gap-8"
              >
                <Name name={name} />
                <Dot />
              </span>
            ))}
            <AndMore />
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}
