"use client";

/**
 * Navbar — floating rounded pill over the cream canvas (per the design
 * reference): wordmark left, links centre, theme toggle + primary CTA right.
 * Collapses to a hamburger sheet below lg.
 */
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import PillButton from "@/components/ui/PillButton";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

const NAV_LINKS = [
  { label: "Apps", href: "/apps" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/studio" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on navigation. Adjusting state during render rather
  // than in an effect keeps it to one render pass — an effect here would paint
  // the sheet over the new route first, then close it.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Lock body scroll while the sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        /*
         * Opaque once scrolled, never translucent. A blurred 80% bar looked
         * elegant over the hero and then vanished the moment a dark section
         * (the ink card, the closing block) passed beneath it — ink type on
         * a dark blur is unreadable. Page tops are all light canvas, so the
         * transparent-at-rest state is safe; everything after it is not.
         */
        scrolled
          ? "border-b border-border bg-bg shadow-nav"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex w-full max-w-content items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="For The Rest Of Us — home"
        >
          <Image
            src="/icons/logo-light.png"
            alt="For The Rest Of Us"
            width={750}
            height={110}
            priority
            className="h-[22px] w-auto dark:hidden"
          />
          <Image
            src="/icons/logo-dark.png"
            alt="For The Rest Of Us"
            width={750}
            height={110}
            priority
            className="hidden h-[22px] w-auto dark:block"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors",
                  isActive(link.href) ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <PillButton href="/contact" className="hidden sm:inline-flex">
            Start a project
          </PillButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-ink transition-colors hover:bg-sunken lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 overflow-hidden rounded-well border border-border bg-surface p-3 shadow-nav sm:mx-8 lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-base transition-colors",
                      isActive(link.href)
                        ? "bg-sunken text-ink"
                        : "text-muted hover:bg-sunken hover:text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 px-1 pb-1">
              <PillButton href="/contact" className="w-full justify-between">
                Start a project
              </PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
