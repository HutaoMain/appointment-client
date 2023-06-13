import { create } from "zustand";

interface AuthStore {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: localStorage.getItem("notorious-details-user") || null,
  setUser: (user) => {
    localStorage.setItem("notorious-details-user", user);
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("notorious-details-user");
    set({ user: null });
  },
}));

export default useAuthStore;
