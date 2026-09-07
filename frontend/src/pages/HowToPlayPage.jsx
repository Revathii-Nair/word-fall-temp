import { Clock3, Target, Trophy } from "lucide-react";

export default function HowToPlayPage() {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-brand-border bg-brand-card p-6">
          <h2 className=" text-xl font-black">Find a word</h2>

          <p className="mt-2 text-sm leading-7 text-brand-muted">
            Select two cells that form a horizontal, vertical, or diagonal line to create a word.
          </p>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-card p-6">
          <h2 className=" text-xl font-black">Submit the word</h2>

          <p className="mt-2 text-sm leading-7 text-brand-muted">
            Release your selection to submit the word. Valid words are added to your score immediately.
          </p>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-card p-6">
          <h2 className="text-xl font-black">Score before time runs out</h2>

          <p className="mt-2 text-sm leading-7 text-brand-muted">
            Find as many valid words as possible before the timer reaches zero. Longer words earn more points.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-brand-border bg-brand-card p-5">
        <h3 className="font-bold">Round rules</h3>

        <ul className="mt-4 space-y-3 text-sm text-brand-muted">
          <li className="flex gap-3">
            <Clock3 size={17} />
            Each round lasts 90 seconds.
          </li>

          <li className="flex gap-3">
            <Target size={17} />
            Find words by selecting cells in a straight horizontal, vertical, or diagonal line.
          </li>

          <li className="flex gap-3">
            <Trophy size={17} />
            Your score, words, and completed round are saved to your account.
          </li>
        </ul>
      </div>
    </div>
  );
}
