import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useKenoStore } from '../../lib/kenoStore'

export const KenoMultiplier = () => {
    const { selectedTiles } = useKenoStore()
    const [multipliers, setMultipliers] = useState([])

    useEffect(() => {
        const picks = selectedTiles.length

        const generateMultipliers = (count) => {
            let result = []
            for (let i = 0; i < count; i++) {
                result.push((Math.random() * (5 - 1) + 1).toFixed(2))
            }
            return result
        }

        setMultipliers(generateMultipliers(picks))
    }, [selectedTiles])

    return (
        <div
            className={clsx(
                'mx-auto mt-4 flex gap-2.5',
                'max-w-[20.375rem] min-[600px]:max-w-[37.5rem] min-[600px]:gap-4 min-[896px]:max-w-[55.25rem]',
            )}
        >
            {multipliers.map((multiplier, index) => (
                <div key={index} className="flex-1 rounded bg-dark-500 py-1 text-center">
                    <span
                        className={clsx(
                            'relative font-semibold',
                            'text-[0.625rem] min-[600px]:text-base',
                            'after:absolute after:-top-2 after:left-full after:pl-px',
                            'after:text-[0.625rem] after:content-["x"]',
                        )}
                    >
                        {multiplier}
                    </span>
                </div>
            ))}
        </div>
    )
}
