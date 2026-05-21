"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { App } from "@/lib/apps";
import Badge from "@/components/ui/Badge";
import PlaceholderIcon from "@/components/ui/PlaceholderIcon";

export default function AppCard({ app }: { app: App }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      <Link
        href={`/apps/${app.slug}`}
        className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        style={
          {
            // accent color bleeds into border on hover
            "--app-accent": app.accentColor,
          } as React.CSSProperties
        }
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ borderColor: app.accentColor }}
          aria-hidden="true"
        />

        <div className="flex items-start justify-between">
          <PlaceholderIcon color={app.accentColor} label={app.name} size={64} />
          <ArrowUpRight className="h-5 w-5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
        </div>

        <p className="mt-5 text-xs font-medium uppercase tracking-widest text-muted">
          {app.category}
        </p>
        <h3 className="mt-1 font-heading text-xl font-bold text-ink">
          {app.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="platform">{app.platform.join(" · ")}</Badge>
          <Badge variant="status" status={app.status}>
            {app.status}
          </Badge>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">
          {app.shortDescription}
        </p>

        <span className="mt-auto pt-5 text-sm font-medium font-heading text-ink">
          Learn more
          <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
