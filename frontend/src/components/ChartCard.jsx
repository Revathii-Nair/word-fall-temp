export default function ChartCard({ history }) {
  const rounds = history.slice(-12);

  const scores = rounds.map((game) => Number(game.score || 0));
  const maxScore = Math.max(...scores, 1);

  const bars = rounds.map((game) => {
    const score = Number(game.score || 0);
    return Math.max(8, (score / maxScore) * 100);
  });

  const firstScore = Number(rounds[0]?.score || 0);
  const lastScore = Number(rounds[rounds.length - 1]?.score || 0);

  const change = rounds.length >= 2 ? Math.round(((lastScore - firstScore) / Math.max(firstScore, 1)) * 100) : 0;

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold">Score trend</h3>
          <p className="mt-1 text-xs text-brand-muted">Last {rounds.length} rounds</p>
        </div>

        {rounds.length >= 2 && (
          <span className="rounded-full border border-brand-accent bg-brand-accent/10 px-2.5 py-1 text-[10px] font-bold text-brand-accent">
            {change >= 0 ? "+" : ""}
            {change}%
          </span>
        )}
      </div>

      <div className="mt-8 flex h-52 items-end gap-2 border-b border-brand-border pb-2">
        {rounds.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-brand-muted">No game history yet.</div>
        ) : (
          rounds.map((game, index) => (
            <div key={`${game.username}-${game.gameId}`} className="group flex h-full flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-brand-secondary/60 transition group-hover:bg-brand-accent"
                style={{ height: `${bars[index]}%` }}
                title={`Game #${game.gameId} — ${game.score} points`}
              />
            </div>
          ))
        )}
      </div>

      {rounds.length > 0 && (
        <div className="mt-2 flex justify-between text-[10px] text-brand-muted">
          <span>#{rounds[0].gameId}</span>
          <span>#{rounds[Math.floor(rounds.length / 2)].gameId}</span>
          <span>#{rounds[rounds.length - 1].gameId}</span>
        </div>
      )}
    </div>
  );
}
