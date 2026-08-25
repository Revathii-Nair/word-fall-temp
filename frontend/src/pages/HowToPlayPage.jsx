import { Clock3, Target, Trophy } from "lucide-react";
import PageTitle from "../components/PageTitle.jsx";
export default function HowToPlayPage() {
  return (
    <div>
      <PageTitle
        eyebrow="Rules & controls"
        title="How to play"
        description="Everything needed for the core single-player loop and cascading-letter mechanic."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          ["1", "Find a line", "Select two cells that form a horizontal, vertical, or diagonal line."],
          ["2", "Collect the word", "If the word is in the target list, it scores immediately."],
          ["3", "Watch the fall", "Collected cells disappear, survivors collapse downward, and fresh letters enter from above."],
        ].map(([number, title, description]) => (
          <div key={number} className="rounded-2xl border border-brand-border bg-brand-card p-6">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-accent/10 text-sm font-black text-brand-accent">{number}</div>
            <h2 className="mt-5 text-xl font-black">{title}</h2>
            <p className="mt-2 text-sm leading-7 text-brand-muted">{description}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-brand-border bg-brand-card p-5">
        <h3 className="font-bold">Round rules</h3>
        <ul className="mt-4 space-y-3 text-sm text-brand-muted">
          <li className="flex gap-3">
            <Clock3 size={17} />
            90-second local demo timer.
          </li>
          <li className="flex gap-3">
            <Target size={17} />
            Solo play; no live interaction during a round.
          </li>
          <li className="flex gap-3">
            <Trophy size={17} />
            Leaderboard results appear after submission.
          </li>
        </ul>
      </div>
    </div>
  );
}
