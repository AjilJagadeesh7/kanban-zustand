import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { db } from "../config/firebaseConfig";
import { useAuthStore } from "./authStore";

interface Task {
  id: number | string;
  title: string;
  state: string;
  date: string;
}

interface TaskStoreState {
  tasks: Task[] | any[];
  draggedTask: string | number | null;
  taskIsLoading: boolean;
  addTask: (title: string, state: string) => void;
  deleteTask: (id: number | string) => void;
  setDraggedTask: (id: string | number | null) => void;
  moveTask: (id: number | string | null, state: string) => void;
  setTaskIsLoading: (taskIsLoading: boolean) => void;
}

const taskStore: StateCreator<TaskStoreState> = (set) => {
  const currentUser = useAuthStore.getState().user;
  const fetchTask = async () => {
    set(() => ({ taskIsLoading: true }));
    const docRef = collection(db, "tasks");
    try {
      const querySnapshot = await getDocs(query(docRef));
      const taskList = querySnapshot.docs.map((doc) => {
        console.log(doc);
        return { id: doc.id, ...doc.data() };
      });
      console.log(taskList);
      set(() => ({ tasks: taskList, taskIsLoading: false }));
    } catch (error) {
      console.error(error);
    }
  };
  const addTask = async (title, state) => {
    try {
      const newTaskRef = doc(collection(db, "tasks"));
      await setDoc(newTaskRef, { title, state });
      await fetchTask();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      await fetchTask();
    } catch (error) {
      console.error(error);
    }
  };

  const moveTask = async (id, state) => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, {
        state: state,
      });
      await fetchTask();
    } catch (error) {
      console.error(error);
    }
  };

  const setTaskIsLoading = (taskIsLoading) => set(() => ({ taskIsLoading }));
  return {
    tasks: [],
    taskIsLoading: false,
    draggedTask: null,
    setDraggedTask: (id) => set({ draggedTask: id }),
    setTaskIsLoading,
    addTask,
    deleteTask,
    moveTask,
  };
};

export const useTaskStore = create(persist(taskStore, { name: "tasks" }));
