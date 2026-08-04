/**
 * LegalDocument — data-driven renderer for privacy, terms, and FAQ pages.
 * Sits on a narrow reading column so long copy stays comfortable.
 */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface LegalSection {
  id?: string;
  heading: string;
  body?: React.ReactNode[];
  bullets?: React.ReactNode[];
}

const TOKEN = /([\w.+-]+@[\w-]+\.[\w.]+|https?:\/\/[^\s,)]+)/g;

/**
 * Auto-link emails and URLs, but only in plain strings — nodes that are
 * already JSX (as on the tapa and CaughtSlipping pages) pass through
 * untouched, so this stays backwards compatible.
 */
function linkify(node: React.ReactNode): React.ReactNode {
  if (typeof node !== "string") return node;
  return node.split(TOKEN).map((part, i) => {
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a key={i} className="text-accent-deep underline" href={`mailto:${part}`}>
          {part}
        </a>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          className="text-accent-deep underline"
          href={part}
          target="_blank"
          rel="noreferrer"
        >
          {part.replace(/^https?:\/\//, "")}
        </a>
      );
    }
    return part;
  });
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
    <div className="bg-bg">
      <article className="mx-auto max-w-reading px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <h1 className="mt-9 text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
          {title}
        </h1>
        <p className="mt-4 text-[0.9375rem] text-faint">
          Last updated: {lastUpdated}
        </p>

        {intro && (
          <div className="mt-9 space-y-4 border-t border-border pt-9">
            {intro.map((paragraph, i) => (
              <p
                key={i}
                className="text-pretty text-lg leading-relaxed text-ink"
              >
                {linkify(paragraph)}
              </p>
            ))}
          </div>
        )}

        <div className="mt-12 space-y-11">
          {sections.map((section, i) => (
            <section key={i} id={section.id} className="scroll-mt-32">
              <h2 className="text-xl font-medium tracking-[-0.01em] text-ink">
                {section.heading}
              </h2>
              {section.body && (
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-pretty leading-relaxed text-muted"
                    >
                      {linkify(paragraph)}
                    </p>
                  ))}
                </div>
              )}
              {section.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((item, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed text-muted">
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="text-pretty">{linkify(item)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
