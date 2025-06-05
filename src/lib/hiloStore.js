import { create } from 'zustand'

export const useHiloStore = create((set) => ({
    choice: 'gte',
    notificationBalance: 0,
    clientCard: null,
    userBet: null,
    history: [],
    historyQueue: null,
    setHistoryQueue: (newHistoryItem) => {
        set((state) => {
            if (state.historyQueue && state.historyQueue.id === newHistoryItem.id) return state
            return {historyQueue: newHistoryItem}
        })
    },
    setNotificationBalance: (notificationBalance) => set({ notificationBalance }),
    setHistory: (history) => set({ history }),
    addToHistory: (newHistoryRecord) => {
        set((state) => {
            if (!newHistoryRecord) return state
            if (state.history[0] && state.history[0].id === newHistoryRecord.id) {
                console.log('IS DUBLICATE NOT ADD TO HISTORY')
                console.log(state.history[0].id, newHistoryRecord.id)
                return state
            }
            console.log('ADD TO HISTORY')
            return { history: [newHistoryRecord, ...state.history] }
        })
    },
    setClientCard: (card) => set({ clientCard: card }),
    setFirstClientCard: (card) => {
        set(state => {
            if (!state.clientCard) {
                return {clientCard: card}
            }
            return state
        })
    },
    setChoice: (choice) => set({ choice }),
    setUserBet: (userBet) => set({ userBet }),
    // isDisabled: false,
    // isRollOver: true,
    // rollProgress: 50,
    //
    // session: null,
    // bet: null,
    //
    // gameHistory: [],
    //
    // setDisabledState: (isDisabled) => set({ isDisabled }),
    //
    // toggleRollState: () =>
    //     set((state) => ({
    //         isRollOver: !state.isRollOver,
    //     })),
    //
    // setRollProgress: (rollProgress) => set({ rollProgress }),
    //
    // setSession: (session) => set({ session }),
    //
    // setBet: (bet) => set({ bet }),
    //
    // addToHistory: (entry) =>
    //     set((state) => ({
    //         gameHistory: [...state.gameHistory, entry],
    //     })),
    //
    // clearHistory: () => set({ gameHistory: [] }),
}))
