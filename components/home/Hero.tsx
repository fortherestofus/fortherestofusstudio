"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  PhoneCaughtSlipping,
  PhoneInSpiritInTruth,
  PhoneRecipeAI,
} from "@/components/home/HeroPhonesMockup";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const phonesContainerRef = useRef<HTMLDivElement>(null);
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

      // Phones enter, then start floating
      gsap.fromTo(
        ".hero-phone",
        { opacity: 0, y: 55, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.18,
          ease: "power3.out",
          delay: 0.5,
          onComplete() {
            gsap.to(".hero-phone-a", {
              y: -14,
              duration: 3.8,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });
            gsap.to(".hero-phone-b", {
              y: -10,
              duration: 4.4,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
              delay: 0.7,
            });
            gsap.to(".hero-phone-c", {
              y: -9,
              duration: 3.5,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
              delay: 1.2,
            });
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [reduced]);

  // Smooth mouse parallax on the phone composition
  useEffect(() => {
    if (reduced) return;
    const phones = phonesContainerRef.current;
    if (!phones) return;

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
      phones.style.transform = `translate(${currentX}px, ${currentY}px)`;
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
              className="hero-text-item font-display font-semibold leading-[0.92] tracking-tight text-ink"
              style={{ fontSize: "clamp(3.4rem, 8.5vw, 8.5rem)" }}
            >
              Apps made
              <br />
              for real
              <br />
              <em className="not-italic text-pthalo dark:text-lime">people.</em>
            </h1>

            {/* CTA */}
            <div className="hero-text-item mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#apps"
                className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-pthalo px-7 py-3.5 font-heading text-sm font-medium text-offwhite transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(18,53,36,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg dark:bg-lime dark:text-forest"
              >
                {/* Sliding highlight layer */}
                <span
                  className="absolute inset-0 translate-x-[-101%] bg-lime transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-x-0 dark:bg-pthalo"
                  aria-hidden="true"
                />
                <span className="relative">See what we&apos;re building</span>
                <ArrowDown className="relative h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </div>

            {/* Scroll hint */}
            <div className="hero-text-item mt-16 flex items-center gap-3 text-xs text-muted/50">
              <div className="h-8 w-px bg-border" aria-hidden="true" />
              Scroll to explore
            </div>
          </div>

          {/* ── Right: App phone mockup composition (desktop only) ── */}
          <div className="relative hidden lg:block" style={{ height: "580px" }}>
            <div ref={phonesContainerRef} className="absolute inset-0">

              {/* CaughtSlipping — back left, rotated */}
              <div
                className="hero-phone hero-phone-b absolute opacity-0"
                style={{
                  left: "10px",
                  top: "110px",
                  transform: "rotate(-8deg)",
                  zIndex: 1,
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.15))",
                }}
              >
                {/* Real screenshot? -> <PhoneCaughtSlipping src="/screenshots/caught-slipping.png" /> */}
                <PhoneCaughtSlipping />
              </div>

              {/* InSpiritInTruth — center, front */}
              <div
                className="hero-phone hero-phone-a absolute opacity-0"
                style={{
                  left: "50%",
                  top: "30px",
                  transform: "translateX(-44%) rotate(-2.5deg)",
                  zIndex: 10,
                  filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.22))",
                }}
              >
                {/* Real screenshot? -> <PhoneInSpiritInTruth src="/screenshots/inspiritintruth.png" /> */}
                <PhoneInSpiritInTruth />
              </div>

              {/* RecipeAI — back right */}
              <div
                className="hero-phone hero-phone-c absolute opacity-0"
                style={{
                  right: "4px",
                  top: "120px",
                  transform: "rotate(9deg)",
                  zIndex: 1,
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.12))",
                }}
              >
                {/* Real screenshot? -> <PhoneRecipeAI src="/screenshots/recipeai.png" /> */}
                <PhoneRecipeAI />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
