import { useState, useEffect } from 'preact/hooks'
import clsx from 'clsx'

import { useConfigStore } from '../../lib/configStore'
import { useKenoStore } from '../../lib/kenoStore'

export const KenoTile = ({ value, isCoincided }) => {
    const { currentSession } = useConfigStore()
    const { selectedTiles, toggleSelected, isDisabled: storeDisabled } = useKenoStore()

    const currentState = currentSession?.state

    const isSelected = selectedTiles.includes(value)

    const isButtonDisabled = storeDisabled || currentState !== 'betting' || (!isSelected && selectedTiles.length >= 10)

    const handleClick = () => {
        if (!isButtonDisabled && !isCoincided) {
            toggleSelected(value)
        }
    }

    const baseButtonClasses = [
        'h-[2.25rem] shadow-[0_4px_0_0] min-[600px]:h-[4.5rem]',
        'flex items-center justify-center rounded-lg',
        'text-[0.625rem] font-semibold min-[600px]:text-xl',
        'bg-dark-500 shadow-dark-750',
    ]

    const bettingSelectedClasses =
        currentState !== 'finished' && isSelected ? 'bg-keno-tile-selected shadow-keno-tile-selected-secondary' : ''

    const finishedCoincidedClasses =
        currentState === 'finished' && isSelected && isCoincided
            ? 'border-[5px] border-keno-tile-selected bg-keno-tile-selected-secondary bg-[url(/img/green-gem.svg)] bg-center bg-no-repeat shadow-keno-tile-selected-secondary min-[600px]:border-[10px]'
            : ''

    const finishedWrongClasses =
        currentState === 'finished' && isSelected && !isCoincided
            ? 'bg-keno-tile-wrong shadow-keno-tile-wrong-secondary'
            : ''

    const buttonClasses = clsx(
        ...baseButtonClasses,
        bettingSelectedClasses,
        finishedCoincidedClasses,
        finishedWrongClasses,
    )

    return (
        <button className={buttonClasses} onClick={handleClick} disabled={isButtonDisabled}>
            <span className={clsx('size-5 bg-contain leading-5 min-[600px]:size-8 min-[600px]:leading-8')}>
                {value}
            </span>
        </button>
    )
}
