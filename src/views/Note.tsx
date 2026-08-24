import { useState, type FormEvent } from "react";
import type { AppStore } from "../hooks/useStore";

type Props = {
  store: AppStore;
};

export function Note({ store }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editing, setEditing] = useState<string | null>(null);

  function reset() {
    setTitle("");
    setBody("");
    setEditing(null);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() && !body.trim()) return;
    if (editing) store.updateNote(editing, title, body);
    else store.addNote(title, body);
    reset();
  }

  function startEdit(noteId: string) {
    const note = store.store.notes.find((item) => item.id === noteId);
    if (!note) return;
    setEditing(note.id);
    setTitle(note.title);
    setBody(note.body);
  }

  return (
    <section className="page">
      <p className="kicker">Taccuino</p>
      <h1>
        Le tue <em>note</em>
      </h1>

      <form className="note-form" onSubmit={onSubmit}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Titolo"
          aria-label="Titolo della nota"
        />
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Scrivi qui quello che non vuoi dimenticare…"
          rows={4}
          aria-label="Testo della nota"
        />
        <div className="row">
          <button type="submit" className="btn">
            {editing ? "Salva nota" : "Aggiungi nota"}
          </button>
          {editing && (
            <button type="button" className="ghost" onClick={reset}>
              Annulla
            </button>
          )}
        </div>
      </form>

      {store.store.notes.length === 0 ? (
        <p className="empty">Ancora nessuna nota. Un pensiero breve va benissimo.</p>
      ) : (
        <ul className="note-grid">
          {store.store.notes.map((note) => (
            <li key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.body || "—"}</p>
              <div className="row">
                <button type="button" className="text-btn" onClick={() => startEdit(note.id)}>
                  Modifica
                </button>
                <button
                  type="button"
                  className="ghost"
                  onClick={() => store.removeNote(note.id)}
                >
                  Elimina
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
