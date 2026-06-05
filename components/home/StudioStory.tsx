"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import EditorialVisual from "@/components/ui/EditorialVisual";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { display: "3", numeric: 3, label: "Apps in the works" },
  { display: "4", numeric: 4, label: "Fields: tech, media, design & marketing" },
  { display: "1", numeric: 1, label: "Consultant who'd rather build" },
];

// "Founder at work" visual — an editorial brand panel with a frosted code chip.
function StudioVisual() {
  return (
    <div className="relative">
      {/* Editorial brand visual. To swap in a real studio/founder photo later,
          replace this with:
          <PlaceholderImage src="/studio/founder.jpg" alt="…"
            className="aspect-[4/3] shadow-card"
            sizes="(max-width: 1024px) 100vw, 40vw" /> */}
      <EditorialVisual variant="story" className="aspect-[4/3] shadow-card" />

      {/* Floating frosted code chip — keeps the dev-studio character */}
      <div className="absolute bottom-4 left-4 rounded-xl border border-border bg-bg/85 px-4 py-3 shadow-card backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-lime"
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] text-muted">
            team: <span className="text-ink">1</span>
          </span>
        </div>
        <div className="mt-1 font-mono text-[11px] text-muted">
          based:{" "}
          <span className="text-pthalo dark:text-lime">
            &quot;Johannesburg&quot;
          </span>
        </div>
      </div>
    </div>
  );
}

export default function StudioStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].numeric;

        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              once: true,
            },
            onUpdate() {
              el.textContent = Math.round(
                (this.targets()[0] as { val: number }).val
              ).toString();
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="scroll-mt-24 py-20 sm:py-28"
      aria-labelledby="story-heading"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">
              The person behind it
            </p>
            <h2
              id="story-heading"
              className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
            >
              For the rest of us.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Behind For The Rest Of Us is Alroy Ndhlovu — a consultant in
                Johannesburg who loves building and solving things far too much
                to stop at advice. Every app here began as a small frustration
                with ordinary life: time lost to scrolling, a fridge full of
                random ingredients, a faith practice that&apos;s hard to keep up.
              </p>
              <p>
                The approach is the same whether the problem is personal or a
                business one, and whether it lives in tech, media, design, or
                marketing: start with a real need, build to solve it, learn, and
                make the result feel like it was made for you. Because it was.
              </p>
            </div>

            {/* Stat cards with animated counters */}
            <dl className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-surface p-5 shadow-card"
                >
                  <dt
                    className="font-display text-3xl font-semibold text-ink"
                    aria-live="polite"
                  >
                    <span
                      ref={(el) => {
                        counterRefs.current[i] = el;
                      }}
                    >
                      {s.display}
                    </span>
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Visual placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <StudioVisual />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
