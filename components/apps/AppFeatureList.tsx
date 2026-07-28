/**
 * AppFeatureList — feature cards in a sunken well, matching the studio's
 * feature-grid treatment. Icon tiles carry the app accent; icon glyphs use
 * accentDeep so they stay readable on a pale wash.
 */
import type { App } from "@/lib/apps";
import Icon from "@/components/ui/Icon";
import { Card, Well } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/Section";

export default function AppFeatureList({ app }: { app: App }) {
  const glyph = app.accentDeep ?? app.accentColor;

  return (
    <div>
      <SectionHeading
        align="left"
        eyebrow="Features"
        title={`What ${app.name} does`}
      />

      <Well className="mt-10">
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
          {app.features.map((feature) => (
            <Card key={feature.title} className="flex flex-col p-6">
              <span
                className="mb-5 grid h-11 w-11 place-items-center rounded-xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${app.accentColor} 18%, transparent)`,
                  color: glyph,
                }}
              >
                <Icon name={feature.icon} className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Well>
    </div>
  );
}
