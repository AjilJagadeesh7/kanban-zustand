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
      const q = await query(
        collection(db, "tasks"),
        where("boardId", "==", id)
      );
      const tasksSnapshot = await getDocs(q);
      console.log("q and tasksnapshot", tasksSnapshot, q);
      tasksSnapshot.forEach(async (taskDoc) => {
        const result = await deleteDoc(doc(db, "tasks", taskDoc.id));
        console.log(result);
      });
      await fetchBoards();
      useBoardStore.getState().selectedBoard.id === id &&
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
    setSelectedBoards: (board) =>
      set((state) => ({
        selectedBoard: board || null,
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
