import { useEffect, useState } from "react";
import api from "../lib/api/api.js";

export default function RoundDetails() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api
      .get("/api/user/history")
      .then((response) => {
        setHistory(response.data || []);
      })
      .catch((error) => {
        console.error("Unable to load round history:", error);
      });
  }, []);

  return (
    <div className="mt-6 rounded-2xl border border-brand-border bg-brand-card p-8">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="font-bold">Round details</h3>

          <p className="mt-1 text-xs text-brand-muted">Words and performance from each round</p>
        </div>
      </div>

      <div className="space-y-3">
        {history.length === 0 ? (
          <div className="rounded-xl border border-brand-border bg-background p-4 text-center text-sm text-brand-muted">No rounds yet.</div>
        ) : (
          history.map((round) => (
            <div key={`${round.userId}-${round.gameId}`} className="rounded-xl border border-brand-border bg-background p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-black">{round.mode === "daily" ? `Daily #${round.puzzleId || round.gameId}` : `Game #${round.gameId}`}</p>

                  <p className="mt-1 text-xs text-brand-muted">
                    {round.wordCount || 0} words · {round.score || 0} points
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Difficulty</p>

                  <p className="font-black text-brand-pink">{round.difficulty ?? 50}%</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-brand-border p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Highest scored</p>

                  <p className="mt-1 font-black text-brand-accent">{round.highestWord || "—"}</p>

                  <p className="text-xs text-brand-muted">{round.highestWordScore || 0} pts</p>
                </div>

                <div className="rounded-lg border border-brand-border p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Lowest scored</p>

                  <p className="mt-1 font-black text-brand-accent">{round.lowestWord || "—"}</p>

                  <p className="text-xs text-brand-muted">{round.lowestWordScore || 0} pts</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-brand-muted">Words collected</p>

                <div className="flex flex-wrap gap-1.5">
                  {round.words && round.words.length > 0 ? (
                    round.words.map((word, index) => (
                      <span
                        key={`${round.gameId}-${word}-${index}`}
                        className="rounded-md border border-brand-border px-2 py-1 text-xs font-bold text-brand-muted"
                      >
                        {word}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-brand-muted">No words collected.</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
