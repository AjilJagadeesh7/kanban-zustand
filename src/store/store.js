import { create } from "zustand";
import { persist } from "zustand/middleware";

const taskStore = (set) => ({
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

const inputModalStore = (set) => ({
  show: false,
  state: "PLANNED",
  toggleModal: () =>
    set((store) => {
      return { show: !store.show };
    }),
  selectState: (state) => set(() => ({ state: state })),
});

export const useTaskStore = create(persist(taskStore, { name: "tasks" }));
export const useInputModalStore = create(inputModalStore);
