import { useEffect, useState } from 'preact/hooks'
import clsx from 'clsx'

import { KenoTile } from './KenoTile'
import { KenoPopup } from './KenoPopup'

import { useKenoStore } from '../../lib/kenoStore'
import { useConfigStore } from '../../lib/configStore'

export const KenoTiles = () => {
    const { currentSession } = useConfigStore()
    const { selectedTiles, setDisabledState, clearSelectedTiles } = useKenoStore()

    const [res, setRes] = useState([])

    useEffect(() => {
        if (!currentSession) return

        const { state, sensitive_data } = currentSession

        const newRes = state === 'finished' ? sensitive_data.result : []
        const isDisabled = state !== 'betting'

        if (state === 'waiting') {
            clearSelectedTiles()
        }

        setRes(newRes)
        setDisabledState(isDisabled)
    }, [currentSession])

    return (
        <div className={'relative flex w-full justify-between'}>
            <div
                className={clsx(
                    'mx-auto grid w-full max-w-[20.375rem]',
                    'grid-cols-7 gap-2.5 min-[600px]:gap-4 min-[896px]:grid-cols-10',
                    'min-[600px]:max-w-[37.5rem] min-[896px]:max-w-[55.25rem]',
                )}
            >
                {Array.from({ length: 40 }).map((_, index) => (
                    <KenoTile
                        key={index}
                        value={index + 1}
                        isCoincided={selectedTiles.includes(index + 1) && res.includes(index + 1)}
                    />
                ))}
            </div>

            {/* <KenoPopup /> */}
        </div>
    )
}
