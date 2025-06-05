import { create } from 'zustand'

export const useKenoStore = create((set) => ({
    selectedTiles: [],
    isDisabled: false,

    toggleSelected: (item) =>
        set((state) => {
            const isAlreadySelected = state.selectedTiles.includes(item)
            const isLimitReached = state.selectedTiles.length >= 10

            if (isAlreadySelected) {
                return {
                    selectedTiles: state.selectedTiles.filter((elem) => elem !== item),
                }
            }

            if (isLimitReached) return state

            return {
                selectedTiles: [...state.selectedTiles, item],
            }
        }),
    setDisabledState: (isDisabled) => set((state) => ({ ...state, isDisabled })),
    clearSelectedTiles: () => set({ selectedTiles: [] }),
}))
