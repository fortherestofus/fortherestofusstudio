import Reveal from "@/components/ui/Reveal";

const stats = [
  { value: "3", label: "Apps in development" },
  { value: "Web · Mobile · Browser", label: "Across every platform" },
  { value: "1", label: "Person building it all" },
];

export default function StudioStory() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <Reveal>
            <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">
              Built by one person
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              For the rest of us.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                For The Rest Of Us is the work of a single builder in
                Johannesburg. Every app here started as a small frustration with
                ordinary life — too much time lost to scrolling, a fridge full of
                random ingredients, a faith practice that&apos;s hard to keep up.
              </p>
              <p>
                The goal is simple: ship genuinely helpful tools, one at a time,
                and make each one feel like it was made for you. Because it was.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-border bg-surface p-6 shadow-card"
                >
                  <dt className="font-display text-2xl font-semibold text-ink">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
