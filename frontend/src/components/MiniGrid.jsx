import { useMemo } from "react";

export default function MiniGrid() {
  const letters = useMemo(() => makeGrid(7, 7), []);
  return (
    <div className="rounded-2xl border border-brand-border bg-background p-3">
      <div className="mb-3 flex justify-between text-[10px] font-bold uppercase tracking-[.2em] text-brand-muted">
        <span>Preview</span>
        <span className="text-brand-accent">CASCADING</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {letters.flat().map((letter, index) => (
          <div
            key={index}
            className="grid aspect-square place-items-center rounded-md border border-brand-border bg-brand-card text-xs font-black text-cell-text"
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
}
