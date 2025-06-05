import { create } from 'zustand'

export const useChatStore = create((set) => ({
    isChatOpen: false,
    messages: [],
    addStartMessages: (messages) => {
        set((state) => {
            console.log('messages: ', [...messages, ...state.messages])
            let tempSet = new Set();
            const newMessages = [...messages, ...state.messages].filter(item => {
                if(!tempSet.has(item.timestamp)) {
                    tempSet.add(item.timestamp);
                    return item;
                }
            });
            return {messages: newMessages}
        })
    },
    addMessage: (message) => {
        set((state) => {
            return {messages: [...state.messages, message]}
        })
    },
    openChat: () => set((state) => ({ ...state, isChatOpen: true })),
    closeChat: () => set((state) => ({ ...state, isChatOpen: false })),
}))
