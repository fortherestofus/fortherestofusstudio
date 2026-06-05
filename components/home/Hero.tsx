"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import HeroAppChat from "@/components/home/HeroAppChat";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // GSAP entrance sequence
  useEffect(() => {
    if (reduced || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Text elements stagger in
      gsap.fromTo(
        ".hero-text-item",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.08,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  // Smooth mouse parallax on the phone composition
  useEffect(() => {
    if (reduced) return;
    const composition = compositionRef.current;
    if (!composition) return;

    let rafId: number;
    let targetX = 0,
      targetY = 0,
      currentX = 0,
      currentY = 0;

    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * 14;
      targetY = ((e.clientY - cy) / cy) * 8;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;
      composition.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Noise grain overlay */}
      <div className="grain pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      {/* Ambient gradient bleed */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(72% 55% at 76% 18%, rgba(144,168,66,0.11), transparent 65%), radial-gradient(45% 45% at 15% 80%, rgba(18,53,36,0.07), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-content px-5 sm:px-8">
        <div className="grid items-center gap-14 pb-24 pt-28 lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:min-h-screen lg:pb-16 lg:pt-24">

          {/* ── Left: Text content ── */}
          <div>
            {/* Headline */}
            <h1
              className="hero-text-item font-display font-semibold leading-[0.95] tracking-tight text-ink"
              style={{ fontSize: "clamp(2.5rem, 5.4vw, 5.5rem)" }}
            >
              Everyday apps,
              <br />
              for every day
              <br />
              <em className="not-italic text-pthalo dark:text-lime">people.</em>
            </h1>

            {/* Subhead — the studio philosophy in one line */}
            <p className="hero-text-item mt-7 max-w-md text-lg leading-relaxed text-muted">
              Built to solve real problems — making technology genuinely useful
              and genuinely accessible, for everyday people and businesses alike.
            </p>

            {/* CTA */}
            <div className="hero-text-item mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#apps"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-pthalo px-8 py-4 font-heading text-base font-semibold text-offwhite shadow-[0_12px_30px_-10px_rgba(18,53,36,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-12px_rgba(18,53,36,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:bg-lime dark:text-forest dark:shadow-[0_12px_30px_-10px_rgba(144,168,66,0.5)]"
              >
                {/* Sliding highlight layer */}
                <span
                  className="absolute inset-0 translate-x-[-101%] bg-lime transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-x-0 dark:bg-pthalo"
                  aria-hidden="true"
                />
                <span className="relative">See what we&apos;re building</span>
                <ArrowDown className="relative h-[18px] w-[18px] transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* ── Right: Floating app avatars in conversation (desktop only) ── */}
          <div className="relative hidden lg:block" style={{ height: "580px" }}>
            <div ref={compositionRef} className="absolute inset-0">
              <HeroAppChat />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
