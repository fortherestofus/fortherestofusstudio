"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// WebGL shader is client-only — never rendered during static export.
const ShaderGradientBg = dynamic(() => import("./ShaderGradientBg"), {
  ssr: false,
});

export default function CallToAction() {
  const reduced = useReducedMotion();

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
            className="relative overflow-hidden rounded-3xl px-7 py-14 text-offwhite sm:px-14 sm:py-20"
            style={{
              background:
                "linear-gradient(135deg, #0c2218 0%, #123524 50%, #0f3d2a 100%)",
            }}
          >
            {/* ShaderGradient background (skipped under reduced motion — the
                base gradient above remains as the fallback). */}
            {!reduced && (
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
              >
                <ShaderGradientBg />
              </div>
            )}

            {/* Contrast wash so text/buttons stay legible over the shader */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(105deg, rgba(8,28,20,0.62) 0%, rgba(8,28,20,0.28) 42%, rgba(8,28,20,0) 75%)",
              }}
            />

            {/* Thin accent line top */}
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent"
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative max-w-2xl">
              <p className="font-heading text-sm font-semibold uppercase tracking-widest text-lime/80">
                What&apos;s next
              </p>
              <h2
                id="cta-heading"
                className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl"
              >
                More on the way.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-offwhite/80">
                New apps are always in the works. Got an idea for something
                that&apos;d make life easier — or just want to follow along as
                each one ships?
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="mailto:hello@fortherestofus.app"
                  className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-heading text-sm font-semibold text-[#111111] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(240,179,49,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offwhite focus-visible:ring-offset-2 focus-visible:ring-offset-pthalo"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Get in touch
                </a>
                <a
                  href="#apps"
                  className="group inline-flex items-center gap-2 rounded-full border border-offwhite/30 px-7 py-3.5 font-heading text-sm font-medium text-offwhite backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-offwhite/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offwhite focus-visible:ring-offset-2 focus-visible:ring-offset-pthalo"
                >
                  Browse the apps
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>

              {/* Visible email — fallback for users without a mailto handler */}
              <p className="mt-5 text-sm text-offwhite/65">
                Or email{" "}
                <a
                  href="mailto:hello@fortherestofus.app"
                  className="text-offwhite underline decoration-offwhite/30 underline-offset-4 transition-colors hover:decoration-lime"
                >
                  hello@fortherestofus.app
                </a>
              </p>

              {/* System status indicator */}
              <div className="mt-12 flex items-center gap-2 text-xs text-offwhite/50">
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
