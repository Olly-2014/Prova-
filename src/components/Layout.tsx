import type { ReactNode } from "react";
import type { View } from "../lib/types";

const tabs: { id: View; label: string; icon: ReactNode }[] = [
  {
    id: "oggi",
    label: "Oggi",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M5 12c3.5-6 10.5-6 14 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="8.2" r="2.1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "attivita",
    label: "Attività",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M8 7h10M8 12h10M8 17h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M5 7.2l.9.9L7.6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "note",
    label: "Note",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 5.5h10a1.5 1.5 0 0 1 1.5 1.5v10.2L16 19.5H7A1.5 1.5 0 0 1 5.5 18V7A1.5 1.5 0 0 1 7 5.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M16.5 19.3V16H20" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    id: "abitudini",
    label: "Abitudini",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 8.4v4l2.6 1.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

type Props = {
  view: View;
  onChange: (view: View) => void;
  children: ReactNode;
};

export function Layout({ view, onChange, children }: Props) {
  return (
    <div className="shell">
      <header className="topbar">
        <p className="brand">Sereno</p>
        <p className="brand-sub">il tuo spazio del giorno</p>
      </header>

      <main className="content">{children}</main>

      <nav className="dock" aria-label="Sezioni">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={view === tab.id ? "dock-btn is-active" : "dock-btn"}
            onClick={() => onChange(tab.id)}
            aria-current={view === tab.id ? "page" : undefined}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
