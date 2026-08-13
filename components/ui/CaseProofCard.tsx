/**
 * CaseProofCard — one real engagement with its numbers and the honest bits.
 * Shared by the home proof chapter and the service detail pages, so proof
 * renders identically wherever it sits next to a claim.
 */
import { Card } from "@/components/ui/Card";
import type { CaseProof } from "@/lib/proof";
import { cn } from "@/lib/cn";

interface CaseProofCardProps {
  proof: CaseProof;
  className?: string;
}

export default function CaseProofCard({ proof, className }: CaseProofCardProps) {
  return (
    <Card className={cn("flex flex-col p-6", className)}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
          {proof.client}
        </h3>
        <span className="nums shrink-0 text-[0.6875rem] text-muted">
          {proof.period}
        </span>
      </div>

      {/* Never let an exploration read as a client engagement. */}
      {proof.kind === "exploration" && (
        <span className="mt-2 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-accent-deep">
          Self-directed exploration
        </span>
      )}
      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">
        {proof.engagement}
      </p>

      <dl className="mt-6 flex flex-1 flex-col gap-4">
        {proof.stats.map((stat) => (
          <div key={stat.label} className="border-t border-border pt-3.5">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="nums block text-[1.5rem] font-medium leading-none tracking-[-0.02em] text-ink">
                {stat.value}
              </span>
              <span className="mt-1 block text-[0.8125rem] text-muted">
                {stat.label}
                {stat.detail && (
                  <span className="text-faint"> · {stat.detail}</span>
                )}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {proof.note && (
        <p className="mt-5 border-t border-dashed border-border pt-4 text-[0.8125rem] leading-relaxed text-muted">
          {proof.note}
        </p>
      )}
    </Card>
  );
}
