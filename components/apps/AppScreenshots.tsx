"use client";

import Image from "next/image";
import type { App } from "@/lib/apps";

function PlaceholderTile({ app, index }: { app: App; index: number }) {
  return (
    <div
      className="flex aspect-[16/10] min-w-[85%] snap-center items-center justify-center rounded-2xl border border-border sm:min-w-[calc(50%-0.5rem)]"
      style={{
        background: `linear-gradient(135deg, ${app.accentColor}26, ${app.accentColor}0d)`,
      }}
    >
      <div className="text-center">
        <p
          className="font-display text-3xl font-semibold"
          style={{ color: app.accentColor }}
        >
          {app.name}
        </p>
        <p className="mt-1 text-sm text-muted">Screenshot {index + 1}</p>
      </div>
    </div>
  );
}

export default function AppScreenshots({ app }: { app: App }) {
  const hasShots = app.screenshots.length > 0;
  const items = hasShots ? app.screenshots : [0, 1];

  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar">
      {items.map((item, i) =>
        hasShots ? (
          <div
            key={item as string}
            className="relative aspect-[16/10] min-w-[85%] shrink-0 snap-center overflow-hidden rounded-2xl border border-border sm:min-w-[calc(50%-0.5rem)]"
          >
            <Image
              src={item as string}
              alt={`${app.name} screenshot ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <PlaceholderTile key={i} app={app} index={i} />
        )
      )}
    </div>
  );
}
