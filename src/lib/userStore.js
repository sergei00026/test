import {create} from 'zustand'

export const useUserStore = create((set) => ({
    token: '',
    // token: null,
    userId: '',
    balance: 0,
    username: '',
    currency: '',
    setToken: (token) => set({token}),
    setBalance: (balance) => set({balance}),
    setUserInfo: (user) => {
        set({
            userId: user.user_id,
            balance: user.balance,
            currency: user.currency,
            username: user.username,
        })
    },
}))