import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { apps } from "@/lib/apps";

// Lucide dropped brand marks, so social glyphs are inline SVGs.
function XMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.21 1.78 1.21 1.04 1.78 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.42.37.8 1.1.8 2.22v3.29c0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedInMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.46c.98 0 1.77-.78 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

// TODO: swap "#" for Alroy's real profile URLs.
const socials = [
  { label: "X (Twitter)", href: "#", Icon: XMark },
  { label: "LinkedIn", href: "#", Icon: LinkedInMark },
  { label: "GitHub", href: "#", Icon: GitHubMark },
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
              Apps made for <span className="text-lime">real people.</span>
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
            Built by one person in Johannesburg
          </p>
        </div>
      </div>
    </footer>
  );
}
