import { Flame, Gamepad2, Play, Sparkles, Target, Trophy, WandSparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle.jsx";
import StatCard from "../components/StatCard.jsx";
import MiniGrid from "../components/MiniGrid.jsx";
import Feature from "../components/Feature.jsx";
export default function HomePage({ user }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full  mb-8 mt-3">
        <h1 className="text-3xl font-bold ">
          Welcome back, <span className="text-brand-accent">{user.name || "Player"}</span>!
        </h1>
      </div>
      <div className="flex flex-auto gap-6">
        <StatCard label="Personal best" value={user.best} sub="points in a single run" icon={Trophy} accent="brand-tertiary" />
        <StatCard label="Current streak" value={`${user.streak} days`} sub="keep the daily chain alive" icon={Flame} accent="brand-pink" />
        <StatCard label="Words found" value={user.words} sub="across completed rounds" icon={Target} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-12">
        <div className="flex-1 rounded-3xl border border-brand-border bg-brand-card p-4 flex flex-col items-center justify-center">
          <div className="flex flex-wrap gap-5 justify-center w-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/play");
              }}
              className="flex-1 rounded-xl border border-brand-accent bg-brand-accent/10 px-4 py-4 text-lg font-bold text-brand-accent min-w-[200px] hover:bg-brand-accent/20 transition-all"
            >
              Play daily puzzle
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/how-to-play");
              }}
              className="flex-1 rounded-xl border border-brand-border px-4 py-4 text-lg font-bold text-brand-muted min-w-[200px] hover:bg-brand-border/20 transition-all"
            >
              How it works
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/leaderboard");
              }}
              className="flex-1 rounded-xl border border-brand-border px-4 py-4 text-lg font-bold text-brand-muted min-w-[200px] hover:bg-brand-border/20 transition-all"
            >
              Leaderboard
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/profile");
              }}
              className="flex-1 rounded-xl border border-brand-border px-4 py-4 text-lg font-bold text-brand-muted min-w-[200px] hover:bg-brand-border/20 transition-all"
            >
              Profile
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/analytics");
              }}
              className="flex-1 rounded-xl border border-brand-border px-4 py-4 text-lg font-bold text-brand-muted min-w-[200px] hover:bg-brand-border/20 transition-all"
            >
              Analytics
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/settings");
              }}
              className="flex-1 rounded-xl border border-brand-border px-4 py-4 text-lg font-bold text-brand-muted min-w-[200px] hover:bg-brand-border/20 transition-all"
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 rounded-3xl border border-brand-border bg-brand-card p-10 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-brand-accent text-center">About Wordfall</h2>

        <p className="text-brand-muted text-sm leading-relaxed text-center max-w-3xl mx-auto">
          Wordfall is a fast‑paced word‑finding challenge where letters cascade into place and every second counts. Build words, chain combos, and
          climb your streak as you race against time. The longer you survive, the more intense the board becomes — pushing your vocabulary and
          reflexes to the limit.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <div className="rounded-2xl border border-brand-border bg-brand-card p-6 w-full sm:w-[280px]">
            <h3 className="text-lg font-bold text-brand-accent mb-2">Dynamic Boards</h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Every round generates a unique board layout, keeping gameplay fresh and unpredictable.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-brand-card p-6 w-full sm:w-[280px]">
            <h3 className="text-lg font-bold text-brand-accent mb-2">Combo System</h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Chain multiple words in quick succession to activate score multipliers and bonus time.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-brand-card p-6 w-full sm:w-[280px]">
            <h3 className="text-lg font-bold text-brand-accent mb-2">Streak Progression</h3>
            <p className="text-sm text-brand-muted leading-relaxed">
              Daily play increases your streak, unlocking new challenges and exclusive rewards.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
