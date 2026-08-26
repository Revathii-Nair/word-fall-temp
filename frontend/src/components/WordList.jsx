export default function WordList({ words }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold">Words collected</h3>
        <span className="text-xs text-brand-muted">{words.length}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {[...words].reverse().map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="animate-word-trail rounded-lg border border-brand-pink bg-brand-pink/10 px-2.5 py-1.5 text-xs font-black text-brand-pink"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
