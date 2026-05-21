"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { apps, type App } from "@/lib/apps";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

// Single dock item — scales + lifts based on cursor proximity (macOS Dock).
function DockLink({
  app,
  mouseX,
  active,
  reduced,
}: {
  app: App;
  mouseX: MotionValue<number>;
  active: boolean;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return 10000;
    return val - (bounds.left + bounds.width / 2);
  });

  const scaleTarget = useTransform(distance, [-150, 0, 150], [1, 1.18, 1]);
  const liftTarget = useTransform(distance, [-150, 0, 150], [0, -5, 0]);
  const scale = useSpring(scaleTarget, {
    stiffness: 280,
    damping: 18,
    mass: 0.25,
  });
  const y = useSpring(liftTarget, { stiffness: 280, damping: 18, mass: 0.25 });

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { scale, y }}
      className="relative"
    >
      <Link
        href={`/apps/${app.slug}`}
        className={`group flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
          active ? "text-ink" : "text-muted hover:text-ink"
        }`}
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: app.accentColor }}
          aria-hidden="true"
        />
        {app.name}
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-content px-4 pt-3 sm:px-6">
        <nav
          className={`flex h-14 items-center justify-between rounded-2xl pl-5 pr-3 transition-all duration-300 ${
            scrolled || menuOpen
              ? "border border-border/70 bg-bg/70 shadow-[0_12px_40px_-14px_rgba(12,34,24,0.3)] backdrop-blur-xl"
              : "border border-border/40 bg-bg/45 shadow-[0_8px_30px_-18px_rgba(12,34,24,0.2)] backdrop-blur-md"
          }`}
        >
          <Link
            href="/"
            className="font-display text-lg italic tracking-tight text-ink"
          >
            For The Rest Of Us
          </Link>

          {/* Desktop dock */}
          <div className="hidden items-center gap-1 md:flex">
            <div
              onMouseMove={
                reduced ? undefined : (e) => mouseX.set(e.clientX)
              }
              onMouseLeave={reduced ? undefined : () => mouseX.set(Infinity)}
              className="flex items-center gap-1"
            >
              {apps.map((app) => (
                <DockLink
                  key={app.slug}
                  app={app}
                  mouseX={mouseX}
                  active={isActive(app.slug)}
                  reduced={reduced}
                />
              ))}
            </div>
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 overflow-hidden rounded-2xl border border-border/70 bg-bg/85 p-2 shadow-[0_12px_40px_-14px_rgba(12,34,24,0.3)] backdrop-blur-xl md:hidden"
            >
              <ul>
                {apps.map((app, i) => (
                  <motion.li
                    key={app.slug}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.25 }}
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
                        <span className="text-xs text-muted">
                          {app.category}
                        </span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
