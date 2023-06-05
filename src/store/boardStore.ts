import { create } from "zustand";
import {
  query,
  getDocs,
  collection,
  doc,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./authStore";

const boardStore = (set) => {
  const currentUser = useAuthStore.getState().user;
  const fetchBoards = async () => {
    set(() => ({ isLoading: true }));
    const docRef = collection(db, "kanbanBoard");
    try {
      const querySnapshot = await getDocs(
        query(docRef, where("createdBy", "==", currentUser?.uid))
      );
      const boardsList = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      set(() => ({ kanbanBoards: boardsList, isLoading: false }));
    } catch (error) {
      console.error(error);
    }
  };
  const addBoard = async (data) => {
    try {
      const newBoardRef = doc(collection(db, "kanbanBoard"));
      await setDoc(newBoardRef, data);
      await fetchBoards();
    } catch (error) {
      console.error(error);
    }
  };
  return {
    board: {},
    kanbanBoards: [],
    selectedBoard: {},
    isLoading: false,
    setKanbanBoards: (data) => set(() => ({ kanbanBoards: data })),
    setSelectedBoards: (id) =>
      set((state) => ({
        selectedBoard:
          state.kanbanBoards.find((board) => board.id === id) || null,
      })),
    setBoard: (data) => set(() => ({ board: data })),
    setLoading: (isLoading) => set(() => ({ isLoading })),
    fetchBoards,
    addBoard,
  };
};

export const useBoardStore = create(persist(boardStore, { name: "boardList" }));
