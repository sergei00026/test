import { create } from 'zustand'

export const useConfigStore = create((set) => ({
    game: window.location.pathname.replaceAll('/', ''),
    muted: false,
    currentSession: null,
    currentTimestamp: null,
    gameSettings: null,

    setGame: (game) => (state) => ({ ...state, game }),
    toggleMuteState: () => set((state) => ({ ...state, muted: !state.muted })),
    setCurrentSession: (session, timestamp) => {
        set((state) => {
            if (timestamp > state.currentTimestamp) {
                return { ...state, currentSession: session, currentTimestamp: timestamp }
            }
            else {
                return state
            }
        })
    },
    setSettings: (gameSettings) => set({ gameSettings }),
}))
