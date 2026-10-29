import Link from "next/link";

export interface SummaryRow {
  label: string;
  value: string;
  sub?: string;
}

/** A compact card of label/value rows with an optional link to the full page. */
export default function SummaryCard({
  title,
  rows,
  href,
  linkLabel,
  note,
}: {
  title: string;
  rows: SummaryRow[];
  href?: string;
  linkLabel?: string;
  note?: string;
}) {
  return (
    <section className="rounded-xl bg-adm-surface border border-adm-line p-4 sm:p-5 flex flex-col">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-[15px] font-semibold text-adm-ink">{title}</h2>
        {href && (
          <Link href={href} className="text-xs font-medium text-adm-accent hover:text-adm-accent-deep">
            {linkLabel ?? "View details"} →
          </Link>
        )}
      </div>
      <dl className="flex flex-col divide-y divide-adm-line">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline justify-between gap-3 py-2.5">
            <dt className="text-sm text-adm-ink-2">
              {r.label}
              {r.sub && <span className="block text-xs text-adm-muted">{r.sub}</span>}
            </dt>
            <dd className="text-lg font-semibold text-adm-ink">{r.value}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="text-xs text-adm-muted mt-auto pt-3">{note}</p>}
    </section>
  );
}
