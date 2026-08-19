export default function Feature({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-brand-secondary/10 text-brand-secondary">
        <Icon size={18} />
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-brand-muted">{children}</p>
    </div>
  );
}
