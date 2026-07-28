"use client";

/**
 * AppScreenshots — snap carousel of product shots. Falls back to accent-tinted
 * placeholder blocks while real captures do not exist yet.
 */
import Image from "next/image";
import type { App } from "@/lib/apps";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

const ITEM_WIDTH =
  "min-w-[85%] shrink-0 snap-center sm:min-w-[calc(50%-0.5rem)]";

export default function AppScreenshots({ app }: { app: App }) {
  const hasShots = app.screenshots.length > 0;
  const placeholders = [0, 1, 2];

  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar">
      {hasShots
        ? app.screenshots.map((src, i) => (
            <div
              key={src}
              className={`relative aspect-[16/10] overflow-hidden rounded-card border border-border ${ITEM_WIDTH}`}
            >
              <Image
                src={src}
                alt={`${app.name} screenshot ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))
        : placeholders.map((i) => (
            <PlaceholderBlock
              key={i}
              ratio="browser"
              tint={app.accentColor}
              label={`${app.name} screenshot ${i + 1}`}
              className={ITEM_WIDTH}
            />
          ))}
    </div>
  );
}
