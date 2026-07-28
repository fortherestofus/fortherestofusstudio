/**
 * ServicesSection — "Built with you". The consulting and client-build arm,
 * split into what we make and what we advise on.
 */
import { services } from "@/lib/services";
import Section, { SectionHeading } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/Card";
import PillButton from "@/components/ui/PillButton";

export default function ServicesSection() {
  return (
    <Section id="services" tone="sunken">
      <SectionHeading
        eyebrow="Built with you"
        title={
          <>
            We are building.
            <br />
            We are also consulting.
          </>
        }
        subtitle="The same team that ships our own products works on yours — building what you need, and advising on the product, marketing, and operations around it."
      />

      <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <FeatureCard
            key={service.slug}
            icon={service.icon}
            title={service.title}
            description={service.summary}
            href={`/services#${service.arm}`}
          />
        ))}

        {/* Trailing CTA tile keeps the grid balanced at 6 cells. Kept light so
            the dark CTA block further down stays the page's only ink moment. */}
        <div className="flex flex-col justify-between rounded-card border border-border bg-accent-soft p-6">
          <div>
            <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
              Not sure which one you need?
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              Most projects are a mix. Tell us what you are trying to do and we
              will tell you honestly what it takes.
            </p>
          </div>
          <div className="mt-6">
            <PillButton href="/contact">Start a project</PillButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
