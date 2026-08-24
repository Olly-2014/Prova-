import { useState, type FormEvent } from "react";
import type { AppStore } from "../hooks/useStore";
import { formatLongDate, greeting, todayKey } from "../lib/dates";
import type { View } from "../lib/types";

type Props = {
  store: AppStore;
  onOpen: (view: View) => void;
};

export function Oggi({ store, onOpen }: Props) {
  const [draft, setDraft] = useState("");
  const done = store.todaysTasks.filter((task) => task.done).length;
  const total = store.todaysTasks.length;
  const habitsToday = store.store.habits.filter((habit) => habit.checks[todayKey()]).length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    store.addTask(draft);
    setDraft("");
  }

  return (
    <section className="page">
      <p className="kicker">{formatLongDate()}</p>
      <h1>
        {greeting()}.
        <br />
        <em>Come va oggi?</em>
      </h1>

      <div className="hero-card">
        <div>
          <p className="muted">Avanzamento del giorno</p>
          <strong>
            {done} di {total} attività
          </strong>
        </div>
        <div className="ring" style={{ "--p": `${progress}%` } as never}>
          <span>{progress}%</span>
        </div>
      </div>

      <form className="composer" onSubmit={onSubmit}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Aggiungi qualcosa per oggi…"
          aria-label="Nuova attività di oggi"
        />
        <button type="submit" className="btn">
          Aggiungi
        </button>
      </form>

      <div className="section-head">
        <h2>Le cose di oggi</h2>
        <button type="button" className="text-btn" onClick={() => onOpen("attivita")}>
          Vedi tutte
        </button>
      </div>

      {store.todaysTasks.length === 0 ? (
        <p className="empty">Niente in lista. Un piccolo passo basta per iniziare.</p>
      ) : (
        <ul className="task-list">
          {store.todaysTasks.map((task) => (
            <li key={task.id} className={task.done ? "task is-done" : "task"}>
              <button
                type="button"
                className="check"
                onClick={() => store.toggleTask(task.id)}
                aria-label={task.done ? "Segna come da fare" : "Segna come fatta"}
              />
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="section-head">
        <h2>Abitudini</h2>
        <button type="button" className="text-btn" onClick={() => onOpen("abitudini")}>
          Apri
        </button>
      </div>

      <div className="habit-row">
        {store.store.habits.map((habit) => {
          const checked = Boolean(habit.checks[todayKey()]);
          return (
            <button
              key={habit.id}
              type="button"
              className={checked ? "chip is-on" : "chip"}
              style={{ "--accent": habit.accent } as never}
              onClick={() => store.toggleHabit(habit.id)}
            >
              {habit.name}
            </button>
          );
        })}
      </div>
      <p className="muted tiny">
        {habitsToday} di {store.store.habits.length} abitudini segnate oggi
      </p>
    </section>
  );
}
