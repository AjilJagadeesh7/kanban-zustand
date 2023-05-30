import { create } from "zustand";
import { query, getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { persist } from "zustand/middleware";

const boardStore = (set) => ({
  kanbanBoards: [],
  isLoading: false,
  setKanbanBoards: (data) => set(() => ({ kanbanBoards: data })),
  setLoading: (isLoading) => set(() => ({ isLoading })),
  fetchBoards: async () => {
    set(() => ({ isLoading: true }));
    const docRef = query(collection(db, "kanbanBoard"));
    try {
      const querySnapshot = await getDocs(docRef);
      const boardsList = querySnapshot.docs.map((doc) => doc.data());
      set(() => ({ kanbanBoards: boardsList, isLoading: false }));
    } catch (error) {
      console.error(error);
    }
  },
});

export const useBoardStore = create(persist(boardStore, { name: "boardList" }));
