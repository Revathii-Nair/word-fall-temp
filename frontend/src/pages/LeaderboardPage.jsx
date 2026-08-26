import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import PageTitle from "../components/PageTitle.jsx";
import api from "../api.js";

export default function LeaderboardPage({ user }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function loadLeaderboard() {
      const response = await api.get("/api/leaderboard");
      setPlayers(response.data);
    }

    loadLeaderboard();
  }, []);

  const position = players.findIndex((player) => player.username === user.username) + 1;

  return (
    <div>
      <PageTitle title="Leaderboard" description="A shared ranking for the daily puzzle. Results are independent solo runs." />

      <div className="grid items-start gap-5 lg:grid-cols-[1fr_340px]">
        <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-card">
          <div className="grid grid-cols-[52px_1fr_90px_90px_80px] border-b border-brand-border px-4 py-3 text-[10px] font-bold uppercase tracking-[.16em] text-brand-muted">
            <span>#</span>
            <span>Player</span>
            <span>Score</span>
            <span>Words</span>
            <span>Rounds</span>
          </div>

          {players.map((player, index) => (
            <div
              key={player.username}
              className={`grid grid-cols-[52px_1fr_90px_90px_80px] items-center border-b border-brand-border px-4 py-4 text-sm ${
                player.username === user.username ? "bg-brand-accent/10" : ""
              }`}
            >
              <span className="font-black text-brand-muted">{String(index + 1).padStart(2, "0")}</span>

              <span className="font-bold">{player.username}</span>

              <span className="font-black text-brand-accent">{player.best}</span>

              <span className="text-brand-muted">{player.words}</span>

              <span className="text-brand-muted">{player.rounds}</span>
            </div>
          ))}
        </div>

        <div className="self-start rounded-2xl border border-brand-border bg-brand-card p-5">
          <div className="flex items-center gap-2 text-brand-tertiary">
            <Trophy size={18} />
            <span className="font-bold">Your position</span>
          </div>

          <div className="mt-2 text-5xl font-black text-brand-accent">#{position || "-"}</div>

          <p className="mt-2 text-sm text-brand-muted">
            {user.best || 0} points • {user.words || 0} words
          </p>
        </div>
      </div>
    </div>
  );
}
