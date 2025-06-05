import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useKenoStore } from '../../lib/kenoStore'

export const KenoHits = () => {
    const { selectedTiles } = useKenoStore()
    const [hits, setHits] = useState([])

    useEffect(() => {
        const generateRandomNumbers = () => {
            let numbers = new Set()
            while (numbers.size < 20) {
                numbers.add(Math.floor(Math.random() * 40) + 1)
            }
            return Array.from(numbers)
        }

        const drawnNumbers = generateRandomNumbers()
        const matched = selectedTiles.map((num) => (drawnNumbers.includes(num) ? 1 : 0))

        setHits(matched)
    }, [selectedTiles])

    return (
        <div
            className={clsx(
                'max-w-[20.375rem] min-[600px]:max-w-[37.5rem] min-[896px]:max-w-[55.25rem]',
                'mx-auto mt-2.5 flex gap-2.5 rounded bg-dark-500 min-[600px]:gap-4',
            )}
        >
            {hits.map((hit, index) => (
                <div
                    key={index}
                    className={clsx(
                        'flex flex-1 items-center justify-center',
                        'gap-3 py-1 text-center',
                        'after:inline-block after:bg-[url(/img/crystal.svg)] after:bg-contain',
                        'after:size-[0.625rem] min-[600px]:after:size-[1.125rem]'
                    )}
                >
                    <div>
                        <span
                            className={clsx(
                                'relative font-semibold',
                                'text-[0.625rem] min-[600px]:text-base',
                                'after:absolute after:-top-2 after:left-full',
                                'after:pl-px after:text-[0.625rem] after:content-["x"]',
                            )}
                        >
                            {hit}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
