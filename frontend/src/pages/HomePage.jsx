import { useState } from "react";
import HowToPlayPage from "./HowToPlayPage.jsx";
import LeaderboardPage from "./LeaderboardPage.jsx";
import AnalyticsPage from "./AnalyticsPage.jsx";
import PlayPage from "./PlayPage.jsx";

export default function HomePage({ user, setUser }) {
  const [activeSection, setActiveSection] = useState("howto");

  const handleSectionClick = (section) => {
    setActiveSection((current) => (current === section ? null : section));
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex w-full flex-wrap justify-center gap-4">
          <button
            onClick={() => handleSectionClick("howto")}
            className={`min-w-[190px] flex-1 rounded-xl border px-4 py-4 text-lg font-bold transition-all ${
              activeSection === "howto"
                ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                : "border-brand-border text-brand-muted hover:border-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent"
            }`}
          >
            How it works
          </button>

          <button
            onClick={() => handleSectionClick("leaderboard")}
            className={`min-w-[190px] flex-1 rounded-xl border px-4 py-4 text-lg font-bold transition-all ${
              activeSection === "leaderboard"
                ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                : "border-brand-border text-brand-muted hover:border-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent"
            }`}
          >
            Leaderboard
          </button>

          <button
            onClick={() => handleSectionClick("analytics")}
            className={`min-w-[190px] flex-1 rounded-xl border px-4 py-4 text-lg font-bold transition-all ${
              activeSection === "analytics"
                ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                : "border-brand-border text-brand-muted hover:border-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent"
            }`}
          >
            Analytics
          </button>

          <button
            onClick={() => handleSectionClick("daily")}
            className={`min-w-[190px] flex-1 rounded-xl border px-4 py-4 text-lg font-bold transition-all ${
              activeSection === "daily"
                ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                : "border-brand-border text-brand-muted hover:border-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent"
            }`}
          >
            Play daily puzzle
          </button>

          <button
            onClick={() => handleSectionClick("play")}
            className={`min-w-[190px] flex-1 rounded-xl border px-4 py-4 text-lg font-bold transition-all ${
              activeSection === "play"
                ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                : "border-brand-border text-brand-muted hover:border-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent"
            }`}
          >
            Random puzzle
          </button>
        </div>
      </div>

      {activeSection && (
        <div className="mt-8">
          {activeSection === "howto" && <HowToPlayPage />}
          {activeSection === "leaderboard" && <LeaderboardPage user={user} />}
          {activeSection === "analytics" && <AnalyticsPage user={user} />}
          {activeSection === "daily" && <PlayPage user={user} setUser={setUser} daily={true} />}
          {activeSection === "play" && <PlayPage user={user} setUser={setUser} daily={false} />}
        </div>
      )}
    </>
  );
}
