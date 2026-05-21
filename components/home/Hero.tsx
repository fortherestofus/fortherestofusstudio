"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const headline = ["Apps", "made", "for", "real", "people."];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 80% -10%, rgba(144,168,66,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-content px-5 sm:px-8">
        <h1 className="max-w-[14ch] font-display font-semibold leading-[0.95] tracking-tight text-ink">
          <span className="sr-only">Apps made for real people.</span>
          <span
            aria-hidden="true"
            className="flex flex-wrap gap-x-[0.25em]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            {headline.map((word, i) => (
              <motion.span
                key={word}
                className="inline-block"
                initial={{ opacity: 0, y: "0.4em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 max-w-md text-lg text-muted"
        >
          Built by one person. For the rest of us.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-9"
        >
          <a
            href="#apps"
            className="group inline-flex items-center gap-2 rounded-full bg-pthalo px-7 py-3.5 font-heading text-sm font-medium text-offwhite transition-all hover:bg-pthalo/90 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:bg-lime dark:text-forest dark:hover:bg-lime/90"
          >
            See what we&apos;re building
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
