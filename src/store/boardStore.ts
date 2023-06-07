import { create } from "zustand";
import {
  query,
  getDocs,
  collection,
  doc,
  setDoc,
  where,
  deleteDoc,
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
  const deleteBoard = async (id) => {
    try {
      await deleteDoc(doc(db, "kanbanBoard", id));
      await fetchBoards();
      set(() => ({ selectedBoard: null }));
    } catch (error) {
      console.error(error);
    }
  };
  return {
    board: {},
    kanbanBoards: [],
    selectedBoard: {},
    isLoading: false,
    isLoadingBoard: false,
    setKanbanBoards: (data) => set(() => ({ kanbanBoards: data })),
    setSelectedBoards: (id) =>
      set((state) => ({
        selectedBoard:
          state.kanbanBoards.find((board) => board.id === id) || null,
      })),
    setBoard: (data) => set(() => ({ board: data })),
    setLoading: (isLoading) => set(() => ({ isLoading })),
    setLoadingBoard: (isLoading) => set(() => ({ isLoading })),
    fetchBoards,
    addBoard,
    deleteBoard,
  };
};

export const useBoardStore = create(persist(boardStore, { name: "boardList" }));
