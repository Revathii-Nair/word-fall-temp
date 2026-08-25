import { useEffect, useState } from "react";
import { BarChart3, Gamepad2, Sparkles, Target } from "lucide-react";
import PageTitle from "../components/PageTitle.jsx";
import StatCard from "../components/StatCard.jsx";
import ChartCard from "../components/ChartCard.jsx";
import RoundDetails from "../components/RoundDetails.jsx";
import api from "../lib/api/api.js";

export default function AnalyticsPage({ user }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await api.get("/api/user/history");
        setHistory(response.data || []);
      } catch (err) {
        setError(err.response?.data?.detail || err.message || "Unable to load game history.");
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  const totalWords = history.reduce((total, game) => total + Number(game.wordCount || 0), 0);

  const averageWords = history.length ? totalWords / history.length : 0;

  const bestPuzzle = history.length ? Math.max(...history.map((game) => Number(game.wordCount || 0))) : 0;

  return (
    <div>
      <PageTitle
        eyebrow="Player analytics"
        title="Analytics"
        description="Your performance trends and puzzle difficulty based on your previous rounds."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Avg words / round" value={averageWords.toFixed(1)} sub="your history" icon={Target} />

        <StatCard label="Avg score" value={user.best} sub="personal best" icon={BarChart3} accent="brand-secondary" />

        <StatCard label="Best puzzle" value={bestPuzzle} sub="words" icon={Sparkles} accent="brand-tertiary" />

        <StatCard label="Rounds played" value={user.rounds} sub="this account" icon={Gamepad2} accent="brand-pink" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <ChartCard />

        <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
          <h3 className="font-bold">Puzzle difficulty</h3>

          <div className="mt-5 space-y-4">
            {loading ? (
              <p className="text-sm text-brand-muted">Loading...</p>
            ) : error ? (
              <p className="text-sm text-brand-muted">{error}</p>
            ) : history.length === 0 ? (
              <p className="text-sm text-brand-muted">No previous games yet.</p>
            ) : (
              history.slice(0, 4).map((game) => (
                <div key={`${game.userId}-${game.gameId}`}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-semibold">
                      {game.mode === "daily" ? `Daily #${String(game.puzzleId || game.gameId).padStart(2, "0")}` : `Game #${game.gameId}`}
                    </span>

                    <span className="text-brand-muted">{game.difficulty ?? 50}%</span>
                  </div>

                  <div className="h-2 rounded-full bg-background">
                    <div
                      className="h-full rounded-full bg-brand-pink"
                      style={{
                        width: `${game.difficulty ?? 50}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <RoundDetails />
    </div>
  );
}
