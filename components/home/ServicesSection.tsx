/**
 * ServicesSection — "Built with you".
 *
 * Mirrors the design reference: a sunken well holding one rich row of cards
 * with mini-UI vignettes, then a quieter row of icon cards. Every card links
 * to its own service page.
 */
import { services } from "@/lib/services";
import { VIGNETTES, type VignetteKey } from "@/components/services/Vignettes";
import Section, { SectionHeading } from "@/components/ui/Section";
import { Well, VignetteCard, IconCard, ProcessStrip } from "@/components/ui/Card";
import { PROCESS_STEPS } from "@/lib/services";
import PillButton from "@/components/ui/PillButton";

export default function ServicesSection() {
  const [first, second, third, ...rest] = services;
  const featured = [first, second, third];

  return (
    <Section id="services" tone="canvas">
      <SectionHeading
        eyebrow="Built with you"
        title={
          <>
            We are building.
            <br />
            We are also consulting.
          </>
        }
        subtitle="The same hands that ship our own products work on yours — building what you need, and advising on the product, brand, and growth around it."
      />

      <Well className="mt-12 sm:mt-14">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          {featured.map((service) => {
            const Vignette = VIGNETTES[service.slug as VignetteKey];
            return (
              <VignetteCard
                key={service.slug}
                visual={<Vignette />}
                title={service.title}
                description={service.summary}
                href={`/services/${service.slug}`}
              />
            );
          })}
        </div>

        <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-3">
          {rest.map((service) => (
            <IconCard
              key={service.slug}
              icon={service.icon}
              title={service.title}
              description={service.summary}
              href={`/services/${service.slug}`}
            />
          ))}

          {/* Third cell keeps the row balanced and carries the CTA. */}
          <div className="flex flex-col justify-between rounded-card border border-border bg-bg p-6">
            <div>
              <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
                Not sure which you need?
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                Most projects are a mix. Tell us what you are trying to do and
                we will tell you honestly what it takes.
              </p>
            </div>
            <div className="mt-6">
              <PillButton href="/contact">Start a project</PillButton>
            </div>
          </div>
        </div>
      </Well>

      <ProcessStrip steps={PROCESS_STEPS} className="mt-16" />
    </Section>
  );
}
