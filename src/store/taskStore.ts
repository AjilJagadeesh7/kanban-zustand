import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

interface Task {
  id: number | string;
  title: string;
  state: string;
  date: string;
}

interface TaskStoreState {
  tasks: Task[];
  draggedTask: string | number | null;
  addTask: (title: string, state: string, date: string) => void;
  deleteTask: (id: number | string) => void;
  setDraggedTask: (id: string | number | null) => void;
  moveTask: (id: number | string | null, state: string) => void;
}

const taskStore: StateCreator<TaskStoreState> = (set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title, state, date) =>
    set((store) => ({
      tasks: [...store.tasks, { id: Date.now(), title, state, date }],
    })),
  deleteTask: (id) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.id !== id),
    })),
  setDraggedTask: (id) => set({ draggedTask: id }),
  moveTask: (id, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.id === id
          ? {
              id: task.id,
              title: task.title,
              state: state,
              date: task.date,
            }
          : task
      ),
    })),
});

export const useTaskStore = create(persist(taskStore, { name: "tasks" }));
