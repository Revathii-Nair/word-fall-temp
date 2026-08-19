export default function GameStat({ label, value, icon: Icon, accent = 'brand-accent' }) {
  const classes = { 'brand-accent': 'text-brand-accent', 'brand-secondary': 'text-brand-secondary', 'brand-tertiary': 'text-brand-tertiary', 'brand-pink': 'text-brand-pink', 'brand-error': 'text-brand-error' }
  return <div className="rounded-xl border border-brand-border bg-background p-3"><div className="flex items-center gap-2 text-xs text-brand-muted"><Icon size={14}/>{label}</div><div className={`mt-1 text-lg font-black ${classes[accent]}`}>{value}</div></div>
}
