import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { db } from "../config/firebaseConfig";
import { useAuthStore } from "./authStore";
import { useBoardStore } from "./boardStore";
interface Task {
  id: number | string;
  title: string;
  state: string;
  date: string;
}

interface TaskStoreState {
  tasks: Task[] | any[];
  draggedTask: string | null;

  isTasksLoaded: boolean;
  addTask: (title: string, state: string) => void;
  deleteTask: (id: string) => void;
  setDraggedTask: (id: string | null) => void;
  moveTask: (id: string, state: string) => void;

  setTasksLoaded: (isLoaded: boolean) => void;
  fetchTask: () => void;
}

const taskStore: StateCreator<TaskStoreState> = (set) => {
  const currentUser = useAuthStore.getState().user;
  const selectedBoard = useBoardStore.getState().selectedBoard;
  const fetchTask = async () => {
    set((store) => ({ ...store, taskIsLoading: true }));
    try {
      const queryConstraints = [];
      const docRef = collection(db, "tasks");
      queryConstraints.push(where("boardId", "==", selectedBoard.id));
      queryConstraints.push(where("createdBy", "==", currentUser?.uid));
      const querySnapshot = await getDocs(query(docRef, ...queryConstraints));

      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(taskList, selectedBoard.id);
      set(() => ({
        tasks: taskList,
        taskIsLoading: false,
        isTasksLoaded: true, // Set isTasksLoaded to true after fetching tasks
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const addTask = async (title: string, state: string) => {
    try {
      const newTaskRef = doc(collection(db, "tasks"));
      await setDoc(newTaskRef, {
        title,
        state,
        createdBy: currentUser?.uid,
        boardId: selectedBoard?.id,
      });
      await fetchTask();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      await fetchTask();
    } catch (error) {
      console.error(error);
    }
  };

  const moveTask = async (id: string, state: string) => {
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

  return {
    tasks: [],
    isTasksLoaded: false,
    draggedTask: null,
    setDraggedTask: (id) => set({ draggedTask: id }),
    setTasksLoaded: (isLoaded) => set(() => ({ isTasksLoaded: isLoaded })), // Function to set isTasksLoaded
    fetchTask,
    addTask,
    deleteTask,
    moveTask,
  };
};

export const useTaskStore = create(persist(taskStore, { name: "tasks" }));
