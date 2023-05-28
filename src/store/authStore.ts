import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const authStore = (set) => ({
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
      console.log(error);
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
      console.log(e);
    }
  },
  signOut: async () => {
    try {
      await signOut(auth);
      set((store) => ({
        user: {},
      }));
    } catch (e) {
      console.log(e);
    }
  },
});

const updateDisplayName = async (user, displayName) => {
  try {
    await updateProfile(user, { displayName });
  } catch (error) {
    console.log("Error updating display name:", error);
  }
};

export const useAuthStore = create(persist(authStore, { name: "user" }));
