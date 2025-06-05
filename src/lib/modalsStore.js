import { create } from 'zustand'

export const useModalsStore = create((set) => ({
    modals: {},
    activeModals: {},
    modalData: {},

    openModal: (modalId, modalData = {}) =>
        set((state) => ({
            modals: { ...state.modals, [modalId]: true },
            activeModals: { ...state.activeModals, [modalId]: true },
            modalData,
        })),

    closeModal: (modalId, delay = 300) => {
        if (delay === 0) {
            set((state) => {
                const updatedActiveModals = { ...state.activeModals }
                delete updatedActiveModals[modalId]

                state.modals[modalId] = false

                return { activeModals: updatedActiveModals }
            })

            return
        }

        set((state) => {
            return { modals: { ...state.modals, [modalId]: false } }
        })

        setTimeout(() => {
            set((state) => {
                const updatedActiveModals = { ...state.activeModals }
                delete updatedActiveModals[modalId]
                return { activeModals: updatedActiveModals }
            })
        }, delay)
    },

    clearModals: () => set({ modals: {}, activeModals: {}, modalData: {} }),
}))
