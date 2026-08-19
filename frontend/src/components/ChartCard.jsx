import { useEffect, useState } from "react";
import api from "../lib/api/api.js";

export default function ChartCard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("/api/user/history").then((response) => {
      setHistory(response.data);
    });
  }, []);

  const rounds = history.slice(-12);

  const maxWords = Math.max(...rounds.map((game) => game.words), 1);

  const bars = rounds.map((game) => Math.max(8, (game.words / maxWords) * 100));

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold">Score trend</h3>

          <p className="mt-1 text-xs text-brand-muted">Last {rounds.length} rounds</p>
        </div>

        {rounds.length >= 2 && (
          <span className="rounded-full border border-brand-accent bg-brand-accent/10 px-2.5 py-1 text-[10px] font-bold text-brand-accent">
            {rounds[rounds.length - 1].words >= rounds[0].words ? "+" : "-"}
            {Math.abs(Math.round(((rounds[rounds.length - 1].words - rounds[0].words) / Math.max(rounds[0].words, 1)) * 100))}%
          </span>
        )}
      </div>

      <div className="mt-8 flex h-52 items-end gap-2 border-b border-brand-border pb-2">
        {rounds.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-brand-muted">No game history yet.</div>
        ) : (
          rounds.map((game, index) => (
            <div key={game.puzzleId} className="group flex h-full flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-brand-secondary/60 transition group-hover:bg-brand-accent"
                style={{
                  height: `${bars[index]}%`,
                }}
                title={`${game.words} words`}
              />
            </div>
          ))
        )}
      </div>

      {rounds.length > 0 && (
        <div className="mt-2 flex justify-between text-[10px] text-brand-muted">
          <span>#{rounds[0].puzzleId}</span>

          <span>#{rounds[Math.floor(rounds.length / 2)].puzzleId}</span>

          <span>#{rounds[rounds.length - 1].puzzleId}</span>
        </div>
      )}
    </div>
  );
}
