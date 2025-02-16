import { create } from "zustand";

// Define user interface
interface User {
  userId: string | null;
  name: string;
  email: string;
  state: string;
  city: string;
  phone: string;
}

// Define Zustand store type
interface UserStore {
  user: User;
  setUserField: <K extends keyof User>(field: K, value: User[K]) => void;
  setUser: (newUser: User) => void;
  clearUser: () => void;
}

// Create Zustand store
const useUserStore = create<UserStore>((set) => ({
  user: {
    userId: localStorage.getItem("userId") || null,
    name: "",
    email: "",
    state: "",
    city: "",
    phone: "",
  },

  // Update a single field
  setUserField: (field, value) =>
    set((state) => ({
      user: {
        ...state.user,
        [field]: value,
      },
    })),

  // Set entire user object at once
  setUser: (newUser) => set({ user: newUser }),

  // Clear user data
  clearUser: () =>
    set({
      user: {
        userId: null,
        name: "",
        email: "",
        state: "",
        city: "",
        phone: "",
      },
    }),
}));

export default useUserStore;
