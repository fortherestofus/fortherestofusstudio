"use client";

import { motion } from "framer-motion";
import EditorialVisual from "@/components/ui/EditorialVisual";

const ease = [0.22, 1, 0.36, 1] as const;

export default function StudioIntro() {
  return (
    <section className="border-t border-border pt-20 pb-12 sm:pt-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left — mission */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">
              The studio
            </p>
            <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
              We build to solve. And to learn.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              For The Rest Of Us is the studio of Alroy Ndhlovu — a consultant
              who&apos;d rather build the solution than just advise on it. The
              throughline is simple: make technology genuinely useful and
              genuinely accessible, for everyday people and the businesses that
              serve them, across tech, media, design, and marketing.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Some of that work ships as the apps below — built in the open, to
              solve a real frustration and to learn something on the way. No
              bloat, no dark patterns, no twenty-step setup. Each one does one
              real job, and does it well.
            </p>
          </motion.div>

          {/* Right — visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="relative"
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10"
              style={{
                background:
                  "radial-gradient(58% 50% at 72% 28%, rgba(144,168,66,0.12), transparent 70%)",
              }}
            />
            {/* Editorial brand visual. To swap in real photography later,
                replace this with:
                <PlaceholderImage src="/studio/everyday.jpg" alt="…"
                  className="aspect-[4/3]" rounded="rounded-3xl"
                  sizes="(max-width: 1024px) 100vw, 45vw" /> */}
            <EditorialVisual variant="intro" className="aspect-[4/3]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
