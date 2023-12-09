import { toast } from '@/components/ui/use-toast'
import { Product } from '@prisma/client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CartStore {
  items: Product[]
  addItem: (item: Product) => void
  removeItem: (id: string) => void
  removeAllItems: () => void
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (item: Product) => {
        const itemsFromStorage = get().items
        const existingItem = itemsFromStorage.find((i) => i.id === item.id)

        if (existingItem) {
          toast({ title: 'Oops!', description: 'The item is already in your cart' })
          return
        }

        set((state) => ({ items: [...state.items, item] }))
        toast({ title: 'Success', description: 'The item has added to your cart' })
      },

      removeItem: (id: string) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== id) }))
        toast({ title: 'Success', description: 'The item has removed' })
      },

      removeAllItems: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
