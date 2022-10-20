import create from 'zustand'

export const useUserStore = create((set: any) => ({
  id: "0",
  isFirstTime: false,
  setIsFirstTime: (isFirstTime: boolean) => set({ isFirstTime }),
  setId: (id: string) => set({ id }),
}))