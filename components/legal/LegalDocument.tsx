import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface LegalSection {
  id?: string;
  heading: string;
  body?: React.ReactNode[];
  bullets?: React.ReactNode[];
}

interface LegalDocumentProps {
  title: string;
  lastUpdated: string;
  backHref: string;
  backLabel: string;
  intro?: React.ReactNode[];
  sections: LegalSection[];
}

export default function LegalDocument({
  title,
  lastUpdated,
  backHref,
  backLabel,
  intro,
  sections,
}: LegalDocumentProps) {
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <h1 className="mt-8 font-display text-4xl font-semibold text-ink sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 text-sm text-muted">Last updated: {lastUpdated}</p>

      {intro && (
        <div className="mt-8 space-y-4">
          {intro.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <div className="mt-12 space-y-12">
        {sections.map((section, i) => (
          <section key={i} id={section.id} className="scroll-mt-28">
            <h2 className="font-heading text-xl font-bold text-ink">
              {section.heading}
            </h2>
            {section.body && (
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph, j) => (
                  <p key={j} className="leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            {section.bullets && (
              <ul className="mt-4 space-y-2.5">
                {section.bullets.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
