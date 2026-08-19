import { Flame, Gamepad2, Target } from "lucide-react";
import PageTitle from "../components/PageTitle.jsx";
import StatCard from "../components/StatCard.jsx";

export default function ProfilePage({ user }) {
  return (
    <div>
      <PageTitle eyebrow="Player profile" title="Your profile" description="Your persistent player statistics." />

      <div className="grid gap-5 lg:grid-cols-[.9fr_1.4fr]">
        <div className="rounded-3xl border border-brand-border bg-brand-card p-6">
          <div className="grid h-20 w-20 place-items-center rounded-2xl border border-brand-accent bg-brand-accent/10 text-2xl font-black text-brand-accent">
            {user.name.slice(0, 2).toUpperCase()}
          </div>

          <h2 className="mt-5 text-2xl font-black">{user.name}</h2>

          <p className="mt-1 text-sm text-brand-muted">Daily puzzle player</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <StatCard label="Words found" value={user.words} sub="all rounds" icon={Target} />

          <StatCard label="Streak" value={`${user.streak}d`} sub="current" icon={Flame} accent="brand-pink" />

          <StatCard label="Rounds" value={user.rounds} sub="completed" icon={Gamepad2} accent="brand-tertiary" />
        </div>
      </div>
    </div>
  );
}
