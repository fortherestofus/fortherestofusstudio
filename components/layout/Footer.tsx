import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { apps } from "@/lib/apps";

// Lucide dropped brand marks, so social glyphs are inline SVGs (simple-icons).
function InstagramMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88" />
    </svg>
  );
}

function TikTokMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

// TODO: swap "#" for the real @fortherestofus profile URLs once the accounts are live.
const socials = [
  { label: "Instagram", href: "#", Icon: InstagramMark },
  { label: "TikTok", href: "#", Icon: TikTokMark },
  { label: "Email", href: "mailto:hello@fortherestofus.app", Icon: Mail },
];

const studioLinks = [
  { label: "What we're building", href: "/#apps" },
  { label: "The studio", href: "/#studio" },
  { label: "Get in touch", href: "mailto:hello@fortherestofus.app" },
];

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-offwhite/50">
        {title}
      </h3>
      <ul className="mt-5 space-y-3.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http") || href.startsWith("mailto");
  return (
    <li>
      <Link
        href={href}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="group inline-flex items-center text-[15px] text-offwhite/70 transition-colors hover:text-offwhite"
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-lime transition-all duration-300 group-hover:w-full" />
        </span>
        {external && (
          <ArrowUpRight className="ml-1 h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-60" />
        )}
      </Link>
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-footer-bg text-offwhite">
      {/* Top hairline */}
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-lime/40 to-transparent"
        aria-hidden="true"
      />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-24 right-0 h-64 w-2/3"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(55% 60% at 75% 0%, rgba(144,168,66,0.14), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Image
              src="/icons/logo-dark.png"
              alt="For The Rest Of Us"
              width={750}
              height={110}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-sm font-display text-[1.75rem] leading-[1.15] tracking-tight sm:text-3xl">
              Everyday apps, for{" "}
              <span className="text-lime">everyday people.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-offwhite/60">
              A build-to-solve studio making technology genuinely useful and
              accessible — for everyday people and businesses alike.
            </p>
            <a
              href="mailto:hello@fortherestofus.app"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-offwhite/10 px-5 py-2.5 text-sm font-medium text-offwhite ring-1 ring-inset ring-offwhite/15 transition-all duration-300 hover:bg-offwhite/15 hover:ring-lime/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="mt-4 text-sm text-offwhite/60">
              or{" "}
              <a
                href="mailto:hello@fortherestofus.app"
                className="text-offwhite/90 underline decoration-offwhite/30 underline-offset-4 transition-colors hover:text-offwhite hover:decoration-lime"
              >
                hello@fortherestofus.app
              </a>
            </p>
          </div>

          {/* Apps column */}
          <div className="md:col-span-3">
            <FooterColumn title="Apps">
              {apps.map((app) => (
                <FooterLink key={app.slug} href={`/apps/${app.slug}`}>
                  {app.name}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          {/* Studio column */}
          <div className="md:col-span-2">
            <FooterColumn title="Studio">
              {studioLinks.map((l) => (
                <FooterLink key={l.label} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>

          {/* Connect / socials */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-offwhite/50">
              Connect
            </h3>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-offwhite/15 bg-offwhite/[0.04] text-offwhite/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime/40 hover:bg-offwhite/10 hover:text-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-offwhite/15 pt-6 text-sm text-offwhite/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} For The Rest Of Us. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-lime"
              aria-hidden="true"
            />
            Built by Alroy Ndhlovu in Johannesburg
          </p>
        </div>
      </div>
    </footer>
  );
}
