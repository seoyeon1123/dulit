// modalStore.ts
import { create } from 'zustand';

interface ModalState {
  isDDayModalOpen: boolean;
  isDatePlanModalOpen: boolean;
  openDDayModal: () => void;
  closeDDayModal: () => void;
  openDatePlanModal: () => void;
  closeDatePlanModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isDDayModalOpen: false,
  isDatePlanModalOpen: false,
  openDDayModal: () => set({ isDDayModalOpen: true }),
  closeDDayModal: () => set({ isDDayModalOpen: false }),
  openDatePlanModal: () => set({ isDatePlanModalOpen: true }),
  closeDatePlanModal: () => set({ isDatePlanModalOpen: false }),
}));
