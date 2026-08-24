import { useState, type FormEvent } from "react";
import type { AppStore } from "../hooks/useStore";
import { todayKey, weekdayLetter, weekKeys } from "../lib/dates";

type Props = {
  store: AppStore;
};

export function Abitudini({ store }: Props) {
  const [draft, setDraft] = useState("");
  const days = weekKeys();
  const today = todayKey();

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    store.addHabit(draft);
    setDraft("");
  }

  return (
    <section className="page">
      <p className="kicker">Settimana</p>
      <h1>
        Le tue <em>abitudini</em>
      </h1>

      <form className="composer" onSubmit={onSubmit}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Nuova abitudine, es. Lettura"
          aria-label="Nuova abitudine"
        />
        <button type="submit" className="btn">
          Aggiungi
        </button>
      </form>

      {store.store.habits.length === 0 ? (
        <p className="empty">Nessuna abitudine ancora. Scegline una piccola e costante.</p>
      ) : (
        <ul className="habit-list">
          {store.store.habits.map((habit) => {
            const weekDone = days.filter((day) => habit.checks[day]).length;
            return (
              <li key={habit.id} className="habit-card">
                <div className="habit-top">
                  <strong style={{ color: habit.accent }}>{habit.name}</strong>
                  <span className="muted">
                    {weekDone}/7
                    <button
                      type="button"
                      className="ghost"
                      onClick={() => store.removeHabit(habit.id)}
                    >
                      Elimina
                    </button>
                  </span>
                </div>
                <div className="week">
                  {days.map((day) => {
                    const on = Boolean(habit.checks[day]);
                    return (
                      <button
                        key={day}
                        type="button"
                        className={on ? "day is-on" : "day"}
                        data-today={day === today || undefined}
                        style={{ "--accent": habit.accent } as never}
                        onClick={() => store.toggleHabit(habit.id, day)}
                        aria-label={`${habit.name} ${day}`}
                      >
                        {weekdayLetter(day)}
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
