import create from 'zustand';

type State = {
  event: string;
  triggerEvent: (event: string) => void;
};

export const useEventStore = create<State>((set) => ({
  event: '',
  triggerEvent: (event) => set({ event }),
}));