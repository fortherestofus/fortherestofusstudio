import type { App } from "@/lib/apps";
import Icon from "@/components/ui/Icon";

export default function AppFeatureList({ app }: { app: App }) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-ink">
        {app.name} features
      </h2>
      <ul className="mt-8 flex flex-col gap-8">
        {app.features.map((feature) => (
          <li key={feature.title} className="flex gap-5">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `${app.accentColor}1f`,
                color: app.accentColor,
              }}
            >
              <Icon name={feature.icon} className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="font-heading text-lg font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="mt-1 max-w-prose leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
