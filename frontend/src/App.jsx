import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";
import Header from "./components/Header.jsx";
import HomePage from "./pages/HomePage.jsx";
import PlayPage from "./pages/PlayPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import HowToPlayPage from "./pages/HowToPlayPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import api from "./api.js";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  useEffect(() => {
    async function loadUser() {
      try {
        const cognitoUser = await getCurrentUser();
        const response = await api.get("/api/user", { params: { username: cognitoUser.username } });
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log("No authenticated Cognito user:", error);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    loadUser();
  }, []);

  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-foreground">
        <div className="text-sm font-bold text-brand-muted">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        {user && <Header user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} dark={dark} setDark={setDark} />}

        <div className="mx-auto w-full max-w-[1500px] px-4 pb-10 pt-5 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/signin" element={<SignInPage setUser={setUser} />} />
            {user ? (
              <>
                <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
                <Route path="/play" element={<PlayPage user={user} setUser={setUser} />} />
                <Route path="/leaderboard" element={<LeaderboardPage user={user} />} />
                <Route path="/analytics" element={<AnalyticsPage user={user} />} />
              </>
            ) : (
              <Route path="*" element={<SignInPage setUser={setUser} />} />
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
