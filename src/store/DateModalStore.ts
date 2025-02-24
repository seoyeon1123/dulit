import { create } from 'zustand';

interface DateModalState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useDateModalStore = create<DateModalState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
