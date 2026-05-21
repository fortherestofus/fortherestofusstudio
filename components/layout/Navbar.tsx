"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DarkModeToggle from "@/components/ui/DarkModeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
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
        <DarkModeToggle />
      </nav>
    </header>
  );
}
