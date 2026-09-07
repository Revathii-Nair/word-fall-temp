export default function StatCard({ label, value, sub, accent }) {
  const textColors = {
    "brand-accent": "text-brand-accent",
    "brand-secondary": "text-brand-secondary",
    "brand-tertiary": "text-brand-tertiary",
    "brand-pink": "text-brand-pink",
    "brand-error": "text-brand-error",
  };
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-brand-muted">{label}</div>
          <div className={`mt-1 text-2xl font-black ${textColors[accent]}`}>{value}</div>
          <div className="mt-1 text-[11px] text-brand-muted">{sub}</div>
        </div>
      </div>
    </div>
  );
}
