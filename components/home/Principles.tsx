"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Sparkles, ShieldCheck } from "lucide-react";

const principles = [
  {
    Icon: HeartHandshake,
    title: "Made for real people",
    body: "Built for the way you actually live, not the way software wishes you did. If someone who hates apps can use it, then it's ready.",
    accent: "#90A842",
  },
  {
    Icon: Sparkles,
    title: "Quietly useful",
    body: "Every app solves one genuine, everyday problem — then gets out of your way. No noise, no nagging, no feature for the sake of a feature.",
    accent: "#F0B331",
  },
  {
    Icon: ShieldCheck,
    title: "Honest and private",
    body: "No dark patterns and no data games. What's free is genuinely free, and what's yours stays yours.",
    accent: "#123524",
  },
];

function TiltCard({
  Icon,
  title,
  body,
  accent,
  index,
}: {
  Icon: React.ElementType;
  title: string;
  body: string;
  accent: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;

      if (glow) {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        glow.style.opacity = "1";
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (card) card.style.transform = "";
    if (glow) glow.style.opacity = "0";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full"
        style={{
          transition: "transform 0.18s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <div className="relative h-full rounded-2xl border border-border bg-surface p-7 shadow-card overflow-hidden">
          {/* Accent top line */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            }}
            aria-hidden="true"
          />

          {/* Cursor glow */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${accent}28, transparent 70%)`,
              transition: "opacity 0.3s ease",
            }}
            aria-hidden="true"
          />

          {/* Icon */}
          <div
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: `${accent}18` }}
          >
            <Icon
              className="h-6 w-6"
              strokeWidth={1.75}
              style={{ color: accent }}
              aria-hidden="true"
            />
          </div>

          <h3 className="relative mt-5 font-heading text-xl font-semibold text-ink">
            {title}
          </h3>
          <p className="relative mt-3 leading-relaxed text-muted">{body}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Principles() {
  return (
    <section className="bg-surface/40 py-20 sm:py-28" aria-labelledby="principles-heading">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="principles-heading"
            className="max-w-2xl font-heading text-3xl font-bold text-ink sm:text-4xl"
          >
            What ties them together
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Different problems, same standard. Here&apos;s what every app under
            this roof has in common.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <TiltCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
