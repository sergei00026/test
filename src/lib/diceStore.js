import { create } from 'zustand'

export const useDiceStore = create((set) => ({
    isDisabled: false,
    isRollOver: true,
    rollProgress: 50,

    session: null,
    bet: null,

    gameHistory: [],

    setDisabledState: (isDisabled) => set({ isDisabled }),

    toggleRollState: () =>
        set((state) => ({
            isRollOver: !state.isRollOver,
        })),

    setRollProgress: (rollProgress) => set({ rollProgress }),

    setSession: (session) => set({ session }),

    setBet: (bet) => set({ bet }),

    addToHistory: (entry) =>
        set((state) => ({
            gameHistory: [...state.gameHistory, entry],
        })),

    clearHistory: () => set({ gameHistory: [] }),
}))
