"use client";

import { motion } from "framer-motion";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

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
              Software shouldn&apos;t make life harder.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              For The Rest Of Us is a small studio building honest, genuinely
              useful apps for everyday people — the kind of tools that quietly
              make navigating life a little easier. No bloat, no dark patterns,
              no twenty-step setup. Each app does one real job, and does it well.
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
            {/* To use a real image: drop it in /public/studio and set src below. */}
            <PlaceholderImage
              // src="/studio/everyday.jpg"
              alt="Everyday life — the people For The Rest Of Us builds for"
              label="Image coming soon"
              accentColor="#90A842"
              className="aspect-[4/3]"
              rounded="rounded-3xl"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
