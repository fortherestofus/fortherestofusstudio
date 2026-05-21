import { HeartHandshake, Sparkles, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const principles = [
  {
    icon: HeartHandshake,
    title: "Made for real people",
    body: "Built for the way you actually live, not the way software wishes you did. If someone who hates apps can use it, then it's ready.",
  },
  {
    icon: Sparkles,
    title: "Quietly useful",
    body: "Every app solves one genuine, everyday problem — then gets out of your way. No noise, no nagging, no feature for the sake of a feature.",
  },
  {
    icon: ShieldCheck,
    title: "Honest and private",
    body: "No dark patterns and no data games. What's free is genuinely free, and what's yours stays yours.",
  },
];

export default function Principles() {
  return (
    <section className="bg-surface/40 py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-heading text-3xl font-bold text-ink sm:text-4xl">
            What ties them together
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Different problems, same standard. Here&apos;s what every app under
            this roof has in common.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-surface p-7 shadow-card">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pthalo/10 text-pthalo dark:bg-lime/15 dark:text-lime">
                  <p.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
