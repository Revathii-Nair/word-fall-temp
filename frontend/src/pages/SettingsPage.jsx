import { LogOut, Moon, ShieldCheck, Sun } from "lucide-react";
import PageTitle from "../components/PageTitle.jsx";
import SettingRow from "../components/SettingRow.jsx";
export default function SettingsPage({ dark, setDark }) {
  return (
    <div>
      <PageTitle eyebrow="Local settings" title="Settings" description="Presentation and gameplay preferences for the browser-only build." />
      <div className="max-w-3xl space-y-4">
        <SettingRow icon={dark ? Moon : Sun} title="Theme" description="Switch between your supplied dark and light tokens.">
          <button
            onClick={() => setDark((value) => !value)}
            className="rounded-xl border border-brand-border bg-background px-4 py-2 text-sm font-bold text-brand-accent"
          >
            {dark ? "Dark" : "Light"}
          </button>
        </SettingRow>

        <SettingRow icon={ShieldCheck} title="Cloud services" description="AWS integrations are deliberately disabled.">
          <span className="rounded-full border border-brand-tertiary bg-brand-tertiary/10 px-3 py-1 text-xs font-bold text-brand-tertiary">
            Not connected
          </span>
        </SettingRow>
        <SettingRow icon={LogOut} title="Authentication" description="Cognito sign-in is reserved for the cloud phase.">
          <span className="rounded-full border border-brand-border px-3 py-1 text-xs font-bold text-brand-muted">Local demo</span>
        </SettingRow>
      </div>
    </div>
  );
}
