/**
 * ProcessSection — the named three-step process. For a small studio this is
 * the cheapest credibility signal available: it shows how work actually runs.
 */
import { PROCESS_STEPS } from "@/lib/services";
import Section, { SectionHeading } from "@/components/ui/Section";
import { StepCard } from "@/components/ui/Card";

export default function ProcessSection() {
  return (
    <Section id="process" tone="canvas">
      <SectionHeading
        eyebrow="How we work"
        title="Understand, build, grow."
        subtitle="A small studio can move quickly, but only with a clear shape to the work. This is ours, whether the project is ours or yours."
      />

      <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-3">
        {PROCESS_STEPS.map((step) => (
          <StepCard
            key={step.step}
            step={step.step}
            title={step.title}
            description={step.description}
            wash={step.wash}
          />
        ))}
      </div>
    </Section>
  );
}
