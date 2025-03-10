import { create } from "zustand";

type NewNoteState = {
  leadId?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useNewNote = create<NewNoteState>((set) => ({
  leadId: undefined,
  isOpen: false,
  onOpen: (leadId: string) => set({ isOpen: true, leadId }),
  onClose: () => set({ isOpen: false, leadId: undefined }),
}));
