import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api/api.js";

export default function SignUpPage({ setUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      setUser(response.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Unable to create account.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-brand-border bg-brand-card p-7 shadow-xl">
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tight text-brand-accent">Wordfall</h1>

            <p className="mt-2 text-sm text-brand-muted">Create your account to start playing.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold">Name</label>

              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />

                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border border-brand-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-accent"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">Email</label>

              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-brand-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-accent"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">Password</label>

              <div className="relative">
                <LockKeyhole size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full rounded-xl border border-brand-border bg-background py-3 pl-10 pr-11 text-sm outline-none focus:border-brand-accent"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-accent"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-brand-pink bg-brand-pink/10 px-4 py-3 text-sm font-medium text-brand-pink">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-accent px-4 py-3 text-sm font-black text-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-brand-muted">
            Already have an account?
            <Link to="/signin" className="ml-1 font-bold text-brand-accent hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
