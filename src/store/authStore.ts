import { create, StateCreator, StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export interface User {
  display: string;
  email: string;
  refreshToken: string;
  uid: string;
}

interface AuthStore {
  user: User | {};
  createUser: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const authStore: StateCreator<AuthStore> = (
  set: StoreApi<AuthStore>["setState"]
): AuthStore => ({
  user: {},
  createUser: async (email, password, firstName, lastName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const displayName = firstName + " " + lastName;
      await updateDisplayName(user, displayName);

      set((store) => ({
        user: {
          uid: user.uid,
          email: user.email,
          display: user.displayName,
          refreshToken: user.refreshToken,
        },
      }));
    } catch (error) {
      console.error(error);
    }
  },
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        const { user } = userCredential;
        set((store) => ({
          user: {
            uid: user.uid,
            email: user.email,
            display: user.displayName,
            refreshToken: user.refreshToken,
          },
        }));
      }
    } catch (e) {
      console.error(e);
    }
  },
  signOut: async () => {
    try {
      await signOut(auth);
      set((store) => ({
        user: {},
      }));
    } catch (e) {
      console.error(e);
    }
  },
});

const updateDisplayName = async (user: any, displayName: string) => {
  try {
    await updateProfile(user, { displayName });
  } catch (error) {
    console.error("Error updating display name:", error);
  }
};

export const useAuthStore = create(persist(authStore, { name: "user" }));
