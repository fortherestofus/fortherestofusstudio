"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

// Decorative floating orb — parallaxes on scroll
function FloatOrb({
  size,
  color,
  style,
}: {
  size: number;
  color: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="pointer-events-none absolute rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        background: color,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export default function CallToAction() {
  const panelRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  // Orbs move at different scroll rates for a parallax layering effect
  const orbY1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-20, 60]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [60, -20]);

  return (
    <section className="px-5 pb-24 sm:px-8" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={panelRef}
            className="relative overflow-hidden rounded-3xl bg-pthalo px-7 py-14 text-offwhite sm:px-14 sm:py-20"
          >
            {/* Noise grain */}
            <div
              className="grain pointer-events-none absolute inset-0 opacity-30"
              aria-hidden="true"
            />

            {/* Parallax floating orbs */}
            <motion.div style={{ y: orbY1 }} className="absolute" aria-hidden="true">
              <FloatOrb
                size={260}
                color="rgba(144,168,66,0.18)"
                style={{ top: -80, right: 60 }}
              />
            </motion.div>
            <motion.div style={{ y: orbY2 }} className="absolute" aria-hidden="true">
              <FloatOrb
                size={180}
                color="rgba(240,179,49,0.12)"
                style={{ bottom: -40, left: 80 }}
              />
            </motion.div>
            <motion.div style={{ y: orbY3 }} className="absolute" aria-hidden="true">
              <FloatOrb
                size={120}
                color="rgba(144,168,66,0.10)"
                style={{ top: "40%", left: "55%" }}
              />
            </motion.div>

            {/* Thin accent line top */}
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent"
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative max-w-2xl">
              <p className="font-heading text-sm font-semibold uppercase tracking-widest text-lime/70">
                What&apos;s next
              </p>
              <h2
                id="cta-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl"
              >
                More on the way.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-offwhite/75">
                New apps are always in the works. Got an idea for something
                that&apos;d make life easier — or just want to follow along as
                each one ships?
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="mailto:hello@alroyndhlovu.com"
                  className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-heading text-sm font-semibold text-[#111111] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(240,179,49,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offwhite focus-visible:ring-offset-2 focus-visible:ring-offset-pthalo"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Get in touch
                </a>
                <a
                  href="#apps"
                  className="group inline-flex items-center gap-2 rounded-full border border-offwhite/25 px-7 py-3.5 font-heading text-sm font-medium text-offwhite transition-all duration-200 hover:border-offwhite/60 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offwhite focus-visible:ring-offset-2 focus-visible:ring-offset-pthalo"
                >
                  Browse the apps
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>

              {/* System status indicator */}
              <div className="mt-12 flex items-center gap-2 text-xs text-offwhite/40">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime/80" />
                </span>
                All systems building
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
