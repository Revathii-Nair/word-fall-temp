import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import PlayPage from "./pages/PlayPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import HowToPlayPage from "./pages/HowToPlayPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import api from "./lib/api/api.js";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  useEffect(() => {
    api.get("/api/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-foreground">
        <div className="text-sm font-bold text-brand-muted">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Header
          {...{
            menuOpen,
            setMenuOpen,
            dark,
            setDark,
          }}
        />

        <div className="mx-auto w-full max-w-[1500px] px-4 pb-10 pt-5 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/signin" element={<SignInPage setUser={setUser} />} />

            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />

            <Route path="/" element={<HomePage user={user} />} />

            <Route path="/play" element={<PlayPage user={user} setUser={setUser} />} />

            <Route path="/leaderboard" element={<LeaderboardPage user={user} />} />

            <Route path="/profile" element={<ProfilePage user={user} />} />

            <Route path="/analytics" element={<AnalyticsPage user={user} />} />

            <Route path="/how-to-play" element={<HowToPlayPage />} />

            <Route path="/settings" element={<SettingsPage dark={dark} setDark={setDark} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
