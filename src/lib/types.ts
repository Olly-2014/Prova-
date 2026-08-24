export type View = "oggi" | "attivita" | "note" | "abitudini";

export type Task = {
  id: string;
  title: string;
  done: boolean;
  due: string;
  createdAt: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
};

export type Habit = {
  id: string;
  name: string;
  accent: string;
  checks: Record<string, boolean>;
};

export type Store = {
  tasks: Task[];
  notes: Note[];
  habits: Habit[];
};
