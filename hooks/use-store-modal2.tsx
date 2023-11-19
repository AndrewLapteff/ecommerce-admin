import { create } from 'zustand'

interface Props {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export const useStoreModal2 = create<Props>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: true }),
  onOpen: () => set({ isOpen: false }),
}))
