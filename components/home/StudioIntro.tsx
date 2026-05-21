import Reveal from "@/components/ui/Reveal";

export default function StudioIntro() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">
            The studio
          </p>
          <h2 className="mt-5 max-w-4xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
            Software shouldn&apos;t make life harder.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            For The Rest Of Us is a small studio building honest, genuinely
            useful apps for everyday people — the kind of tools that quietly make
            navigating life a little easier. No bloat, no dark patterns, no
            twenty-step setup. Each app does one real job, and does it well.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
