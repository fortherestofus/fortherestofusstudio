"use client";

/**
 * ServicesHero — the variety, shown rather than listed: a product screen, a
 * brand frame, a campaign, an automation board, floating at different
 * depths. Every frame is real work, and each one stands for one of the
 * three pillars below it.
 *
 * The float is slow and desynced; reduced motion holds everything still.
 */
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { getApp } from "@/lib/apps";
import {
  automationWork,
  filosofeeIdentity,
  identityWork,
  marketingWork,
} from "@/lib/work";

const EASE = [0.22, 1, 0.36, 1] as const;

function Frame({
  children,
  className,
  delay = 0,
  drift = 8,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  drift?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={cn(
        "overflow-hidden rounded-card border border-border bg-surface shadow-[0_14px_40px_rgba(23,21,15,0.10)]",
        className
      )}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: delay * 0.09, ease: EASE }}
    >
      <motion.div
        animate={
          reduced
            ? undefined
            : {
                y: [0, -drift, 0],
                transition: {
                  duration: 7 + delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                },
              }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function ServicesHero() {
  const hakkan = getApp("hakkan")!;
  const campaign = marketingWork[0];
  const brand = identityWork[0];
  const shoot = filosofeeIdentity[0];
  const board = automationWork[0];

  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto lg:mr-0">
      {/* Build — a shipped product */}
      <Frame delay={0} className="ml-auto w-[86%]">
        <Image
          src={hakkan.screenshots[0]}
          alt="Hakkan, a product we built"
          className="h-auto w-full"
          sizes="480px"
        />
      </Frame>

      {/* Identity — brand and the shoot behind it */}
      <div className="mt-4 flex gap-4">
        <Frame delay={1.1} drift={10} className="w-1/2">
          <Image
            src={brand.src}
            alt={brand.alt}
            width={brand.width}
            height={brand.height}
            sizes="260px"
            className="h-auto w-full"
          />
        </Frame>
        <Frame delay={1.8} drift={6} className="w-1/2">
          <Image
            src={shoot.src}
            alt={shoot.alt}
            width={shoot.width}
            height={shoot.height}
            sizes="260px"
            className="h-[150px] w-full object-cover object-top"
          />
        </Frame>
      </div>

      {/* Grow — a campaign and the automation behind it */}
      <div className="mt-4 flex gap-4">
        <Frame delay={2.4} drift={9} className="w-[58%]">
          <Image
            src={campaign.src}
            alt={campaign.alt}
            width={campaign.width}
            height={campaign.height}
            sizes="300px"
            className="h-[120px] w-full object-cover object-top"
          />
        </Frame>
        <Frame delay={3} drift={7} className="w-[42%]">
          <Image
            src={board.src}
            alt={board.alt}
            width={board.width}
            height={board.height}
            sizes="220px"
            className="h-[120px] w-full object-cover object-center"
          />
        </Frame>
      </div>
    </div>
  );
}
