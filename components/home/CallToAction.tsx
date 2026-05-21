import { ArrowRight, Mail } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function CallToAction() {
  return (
    <section className="px-5 pb-24 sm:px-8">
      <div className="mx-auto max-w-content">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-pthalo px-7 py-14 text-offwhite sm:px-14 sm:py-20">
            <div
              className="grain pointer-events-none absolute inset-0 opacity-40"
              aria-hidden="true"
            />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                More on the way.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-offwhite/80">
                New apps are always in the works. Got an idea for something
                that&apos;d make life easier — or just want to follow along as
                each one ships?
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="mailto:hello@alroyndhlovu.com"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-heading text-sm font-medium text-[#111111] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offwhite"
                >
                  <Mail className="h-4 w-4" />
                  Get in touch
                </a>
                <a
                  href="#apps"
                  className="group inline-flex items-center gap-2 rounded-full border border-offwhite/30 px-7 py-3.5 font-heading text-sm font-medium text-offwhite transition-colors hover:border-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offwhite"
                >
                  Browse the apps
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
