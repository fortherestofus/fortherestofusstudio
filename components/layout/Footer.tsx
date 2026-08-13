/**
 * Footer — the dark ink block that closes every page (per the design
 * reference): brand block with a display statement on the left, link columns
 * on the right, legal strip underneath.
 */
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { apps } from "@/lib/apps";
import { HELLO_EMAIL } from "@/lib/contact";

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
const SOCIALS = [
  { label: "Instagram", href: "#", Icon: InstagramMark },
  { label: "TikTok", href: "#", Icon: TikTokMark },
  { label: "Email", href: `mailto:${HELLO_EMAIL}`, Icon: Mail },
];

const SERVICE_LINKS = [
  { label: "Custom apps & SaaS", href: "/services/apps-and-saas/" },
  { label: "Websites", href: "/services/websites/" },
  { label: "Brand & content", href: "/services/brand-and-content/" },
  { label: "Marketing & analytics", href: "/services/product-and-growth/" },
  { label: "Tech & automation", href: "/services/tech-and-automation/" },
];

const STUDIO_LINKS = [
  { label: "About the studio", href: "/studio" },
  { label: "Start a project", href: "/contact" },
  { label: "Email us", href: `mailto:${HELLO_EMAIL}` },
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
      <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-ink-text/45">
        {title}
      </h3>
      <ul className="mt-5 space-y-3.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="text-[0.9375rem] text-ink-muted transition-colors hover:text-ink-text"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-surface text-ink-text">
      <div className="mx-auto w-full max-w-content px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Image
              src="/icons/logo-dark.png"
              alt="For The Rest Of Us"
              width={191}
              height={28}
              className="h-7 w-auto"
            />
            <p className="mt-6 max-w-sm text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
              A solutions &amp; consulting studio in Johannesburg. We build
              products that solve real problems — for our clients, and for
              our own ideas.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon: Mark }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink-border text-ink-muted transition-colors hover:border-ink-text/30 hover:text-ink-text"
                >
                  <Mark className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn title="Apps">
              {apps.map((app) => (
                <FooterLink key={app.slug} href={`/apps/${app.slug}`}>
                  {app.name}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Services">
              {SERVICE_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Studio">
              {STUDIO_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-text/40">
            © {year} For The Rest Of Us. Built in Johannesburg.
          </p>
          <p className="text-sm text-ink-text/40">
            Studio of{" "}
            <a
              href={`mailto:${HELLO_EMAIL}`}
              className="transition-colors hover:text-ink-text"
            >
              Alroy Ndhlovu
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
