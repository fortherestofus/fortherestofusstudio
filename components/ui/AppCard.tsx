"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { App } from "@/lib/apps";
import Badge from "@/components/ui/Badge";
import PlaceholderIcon from "@/components/ui/PlaceholderIcon";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function AppCard({ app }: { app: App }) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = tiltRef.current;
      const glow = glowRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -7;
      const rotY = ((x - cx) / cx) * 7;

      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.025)`;
      card.style.boxShadow = `0 ${12 + Math.abs(rotX)}px ${40 + Math.abs(rotY) * 2}px rgba(18,53,36,0.18)`;

      if (glow) {
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
        glow.style.opacity = "1";
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const card = tiltRef.current;
    const glow = glowRef.current;
    if (card) {
      card.style.transform = "";
      card.style.boxShadow = "";
    }
    if (glow) glow.style.opacity = "0";
  }, []);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      {/* Tilt wrapper — receives mouse events and applies 3D transform */}
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full"
        style={{
          transition: "transform 0.18s ease-out, box-shadow 0.18s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <Link
          href={`/apps/${app.slug}`}
          className="relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card overflow-hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {/* Accent gradient top edge */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${app.accentColor} 50%, transparent 100%)`,
            }}
            aria-hidden="true"
          />

          {/* Radial glow that follows the cursor */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${app.accentColor}35, transparent 70%)`,
              transition: "opacity 0.3s ease",
            }}
            aria-hidden="true"
          />

          {/* Preview image — auto-swaps to app.screenshots[0] once added */}
          <PlaceholderImage
            src={app.screenshots[0]}
            alt={`${app.name} preview`}
            label="Preview coming soon"
            accentColor={app.accentColor}
            className="relative mb-5 aspect-[16/10]"
            sizes="(max-width: 768px) 80vw, 30vw"
          />

          {/* Card content */}
          <div className="relative flex items-start justify-between">
            <PlaceholderIcon color={app.accentColor} label={app.name} size={64} />
            <ArrowUpRight
              className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              aria-hidden="true"
            />
          </div>

          <p className="relative mt-5 text-xs font-medium uppercase tracking-widest text-muted">
            {app.category}
          </p>
          <h3 className="relative mt-1 font-heading text-xl font-bold text-ink">
            {app.name}
          </h3>

          <div className="relative mt-3 flex flex-wrap gap-2">
            <Badge variant="platform">{app.platform.join(" · ")}</Badge>
            <Badge variant="status" status={app.status}>
              {app.status}
            </Badge>
          </div>

          <p className="relative mt-4 line-clamp-3 text-sm leading-relaxed text-muted">
            {app.shortDescription}
          </p>

          <span className="relative mt-auto pt-5 text-sm font-medium font-heading text-ink transition-colors group-hover:text-pthalo dark:group-hover:text-lime">
            Learn more
            <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
