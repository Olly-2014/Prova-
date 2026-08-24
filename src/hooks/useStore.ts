import { useCallback, useEffect, useMemo, useState } from "react";
import { id, todayKey } from "../lib/dates";
import { loadStore, saveStore } from "../lib/storage";
import type { Habit, Note, Store, Task } from "../lib/types";

export function useStore() {
  const [store, setStore] = useState<Store>(loadStore);

  useEffect(() => {
    saveStore(store);
  }, [store]);

  const today = todayKey();

  const todaysTasks = useMemo(
    () => store.tasks.filter((task) => task.due === today),
    [store.tasks, today],
  );

  const addTask = useCallback((title: string, due = todayKey()) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const task: Task = {
      id: id(),
      title: trimmed,
      done: false,
      due,
      createdAt: new Date().toISOString(),
    };
    setStore((prev) => ({ ...prev, tasks: [task, ...prev.tasks] }));
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setStore((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    }));
  }, []);

  const removeTask = useCallback((taskId: string) => {
    setStore((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== taskId),
    }));
  }, []);

  const addNote = useCallback((title: string, body: string) => {
    const note: Note = {
      id: id(),
      title: title.trim() || "Senza titolo",
      body: body.trim(),
      updatedAt: new Date().toISOString(),
    };
    setStore((prev) => ({ ...prev, notes: [note, ...prev.notes] }));
  }, []);

  const updateNote = useCallback((noteId: string, title: string, body: string) => {
    setStore((prev) => ({
      ...prev,
      notes: prev.notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              title: title.trim() || "Senza titolo",
              body,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    }));
  }, []);

  const removeNote = useCallback((noteId: string) => {
    setStore((prev) => ({
      ...prev,
      notes: prev.notes.filter((note) => note.id !== noteId),
    }));
  }, []);

  const addHabit = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const accents = ["#c45c26", "#4a6b4f", "#5b4a8a", "#8a4a4a", "#3d5a6c"];
    const habit: Habit = {
      id: id(),
      name: trimmed,
      accent: accents[store.habits.length % accents.length],
      checks: {},
    };
    setStore((prev) => ({ ...prev, habits: [...prev.habits, habit] }));
  }, [store.habits.length]);

  const toggleHabit = useCallback((habitId: string, day = todayKey()) => {
    setStore((prev) => ({
      ...prev,
      habits: prev.habits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              checks: { ...habit.checks, [day]: !habit.checks[day] },
            }
          : habit,
      ),
    }));
  }, []);

  const removeHabit = useCallback((habitId: string) => {
    setStore((prev) => ({
      ...prev,
      habits: prev.habits.filter((habit) => habit.id !== habitId),
    }));
  }, []);

  return {
    store,
    today,
    todaysTasks,
    addTask,
    toggleTask,
    removeTask,
    addNote,
    updateNote,
    removeNote,
    addHabit,
    toggleHabit,
    removeHabit,
  };
}

export type AppStore = ReturnType<typeof useStore>;
