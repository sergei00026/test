import {create} from 'zustand'

export const useTableStore = create((set) => ({
    userBets: [],
    setUserBets: (userBets) => set({userBets}),
    addToUserBets: (newUserBet) => {
        set((state) => {

            return {userBets: [newUserBet, ...state.userBets]}
        })
    },
}))
