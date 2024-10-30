import { create } from 'zustand';
import { User, Goal } from '../types';

interface Store {
  user: User | null;
  goals: Goal[];
  loading: boolean;
  setUser: (user: User | null) => void;
  setGoals: (goals: Goal[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  goals: [],
  loading: false,
  setUser: (user) => set({ user }),
  setGoals: (goals) => set({ goals }),
  setLoading: (loading) => set({ loading }),
}));