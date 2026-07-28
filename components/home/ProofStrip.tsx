/**
 * ProofStrip — the "trusted by" band from the design reference, except our own
 * shipped products stand in for client logos. Marquee on small screens,
 * settled row on large ones.
 */
import { apps } from "@/lib/apps";
import { cn } from "@/lib/cn";
import AppIcon from "@/components/ui/AppIcon";

function Strip({
  ariaHidden = false,
  className,
}: {
  ariaHidden?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className={cn("flex shrink-0 items-center", className)}
    >
      {apps.map((app) => (
        <span key={app.slug} className="flex items-center gap-2.5">
          <AppIcon
            icon={app.icon}
            color={app.accentColor}
            label={app.name}
            size={26}
            className="rounded-lg opacity-80"
          />
          <span className="whitespace-nowrap text-[0.9375rem] font-medium text-muted">
            {app.name}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function ProofStrip() {
  return (
    <section className="border-y border-border bg-bg py-10 sm:py-12">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <p className="text-center text-[0.8125rem] text-faint">
          Products designed, built, and shipped by this studio
        </p>

        {/* Marquee below lg, settled row above */}
        <div className="relative mt-7 overflow-hidden lg:hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee">
            <Strip className="gap-10 pr-10 sm:gap-14 sm:pr-14" />
            <Strip ariaHidden className="gap-10 pr-10 sm:gap-14 sm:pr-14" />
          </div>
        </div>
        <div className="mt-7 hidden justify-center lg:flex">
          <Strip className="gap-16" />
        </div>
      </div>
    </section>
  );
}
