"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { apps } from "@/lib/apps";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (slug: string) => pathname === `/apps/${slug}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg italic tracking-tight text-ink sm:text-xl"
        >
          For The Rest Of Us
        </Link>

        {/* Desktop app links */}
        <div className="hidden items-center gap-1 md:flex">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className={`group flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(app.slug)
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform group-hover:scale-125"
                style={{ backgroundColor: app.accentColor }}
                aria-hidden="true"
              />
              {app.name}
            </Link>
          ))}
          <div className="mx-2 h-5 w-px bg-border" aria-hidden="true" />
          <DarkModeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <DarkModeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur-md md:hidden"
          >
            <ul className="mx-auto max-w-content px-5 py-3 sm:px-8">
              {apps.map((app, i) => (
                <motion.li
                  key={app.slug}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={`/apps/${app.slug}`}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-surface"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-display text-sm font-semibold text-white"
                      style={{ backgroundColor: app.accentColor }}
                      aria-hidden="true"
                    >
                      {app.name.charAt(0)}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-ink">
                        {app.name}
                      </span>
                      <span className="text-xs text-muted">{app.category}</span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
