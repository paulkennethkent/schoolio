import { create } from "zustand";

interface SelectionState {
  selectedSchool: string | null;
  setSelectedSchool: (selection: string | null) => void;
}

const useSelectedSchool = create<SelectionState>((set) => ({
  selectedSchool: null,
  setSelectedSchool: (id: string | null) =>
    set((state) => {
      return { selectedSchool: id, setSelectedSchool: state.setSelectedSchool };
    }),
}));

export function useChangeSchool() {
  const store = useSelectedSchool.getState();
  return store.setSelectedSchool;
}

export default useSelectedSchool;

interface OptimismState {
  optimism: boolean;
  setOptimism: (o: boolean) => void;
}

export const useOptimismStore = create<OptimismState>((set) => ({
  optimism: false,
  setOptimism: (o: boolean) =>
    set((state) => {
      return {
        optimism: o,
        setOptimism: state.setOptimism,
      };
    }),
}));
