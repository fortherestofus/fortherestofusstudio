"use client";

import { motion } from "framer-motion";
import { apps } from "@/lib/apps";
import AppCard from "@/components/ui/AppCard";

export default function AppCarousel() {
  return (
    <section id="apps" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl font-bold text-ink sm:text-4xl"
        >
          What we&apos;re building
        </motion.h2>

        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
        >
          {apps.map((app) => (
            <div
              key={app.slug}
              className="min-w-[80%] snap-center sm:min-w-[60%] md:min-w-0"
            >
              <AppCard app={app} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
