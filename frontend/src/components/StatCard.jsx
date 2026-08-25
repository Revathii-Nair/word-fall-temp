export default function StatCard({ label, value, sub, icon: Icon, accent = "brand-accent" }) {
  const colors = {
    "brand-accent": "text-brand-accent border-brand-accent bg-brand-accent/10",
    "brand-secondary": "text-brand-secondary border-brand-secondary bg-brand-secondary/10",
    "brand-tertiary": "text-brand-tertiary border-brand-tertiary bg-brand-tertiary/10",
    "brand-pink": "text-brand-pink border-brand-pink bg-brand-pink/10",
    "brand-error": "text-brand-error border-brand-error bg-brand-error/10",
  };
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-brand-muted">{label}</div>
          <div className={`mt-1 text-2xl font-black ${colors[accent]?.split(" ")[0]}`}>{value}</div>
          <div className="mt-1 text-[11px] text-brand-muted">{sub}</div>
        </div>
        <div className={`rounded-xl border p-2 ${colors[accent]}`}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}
