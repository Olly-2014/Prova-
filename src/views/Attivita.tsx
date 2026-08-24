import { useMemo, useState, type FormEvent } from "react";
import type { AppStore } from "../hooks/useStore";
import { formatShortDate, todayKey } from "../lib/dates";

type Filter = "oggi" | "tutte" | "fatte";

type Props = {
  store: AppStore;
};

export function Attivita({ store }: Props) {
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState<Filter>("oggi");
  const today = todayKey();

  const items = useMemo(() => {
    if (filter === "oggi") return store.store.tasks.filter((task) => task.due === today);
    if (filter === "fatte") return store.store.tasks.filter((task) => task.done);
    return store.store.tasks;
  }, [filter, store.store.tasks, today]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    store.addTask(draft);
    setDraft("");
  }

  return (
    <section className="page">
      <p className="kicker">Lista</p>
      <h1>
        Le tue <em>attività</em>
      </h1>

      <form className="composer" onSubmit={onSubmit}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Cosa vuoi ricordare?"
          aria-label="Nuova attività"
        />
        <button type="submit" className="btn">
          Aggiungi
        </button>
      </form>

      <div className="filters" role="tablist" aria-label="Filtra attività">
        {(
          [
            ["oggi", "Oggi"],
            ["tutte", "Tutte"],
            ["fatte", "Fatte"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            className={filter === id ? "pill is-on" : "pill"}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="empty">Nessuna attività in questa vista.</p>
      ) : (
        <ul className="task-list">
          {items.map((task) => (
            <li key={task.id} className={task.done ? "task is-done" : "task"}>
              <button
                type="button"
                className="check"
                onClick={() => store.toggleTask(task.id)}
                aria-label={task.done ? "Segna come da fare" : "Segna come fatta"}
              />
              <div className="task-copy">
                <span>{task.title}</span>
                <small>{formatShortDate(task.due)}</small>
              </div>
              <button
                type="button"
                className="ghost"
                onClick={() => store.removeTask(task.id)}
                aria-label={`Elimina ${task.title}`}
              >
                Elimina
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
