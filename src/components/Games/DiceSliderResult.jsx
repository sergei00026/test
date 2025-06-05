import { useEffect, useState } from 'preact/hooks'
import { clsx } from 'clsx'

import { useConfigStore } from '../../lib/configStore'
import { useDiceStore } from '../../lib/diceStore'

export const DiceSliderResult = () => {
    const [diceStyles, setDiceStyles] = useState({})
    const [result, setResult] = useState(0)

    const [win, setWin] = useState(false)

    const { currentSession } = useConfigStore()
    const { bet } = useDiceStore()

    const isWinning = (result) => {
        if (!bet || !bet.data) return

        console.log(bet.data)

        const { choice, comparison } = bet.data
        if (comparison === 'lte') return result <= choice
        if (comparison === 'gte') return result >= choice

        return false
    }

    useEffect(() => {
        if (!currentSession) return

        const { state, sensitive_data } = currentSession

        if (state && state === 'betting') {
            setDiceStyles({
                left: `0%`,
                bottom: `0%`,
                opacity: 0,
                transition: `bottom .3s ease, opacity .3s ease, left 0.1s ease .3s`,
            })
        }

        if (state && state === 'finished') {
            const newResult = sensitive_data?.result ?? 0

            setResult(newResult)
            setWin(isWinning(newResult))

            setDiceStyles({
                left: `${newResult.toFixed(2)}%`,
                bottom: `100%`,
                opacity: 1,
                transition: `left .3s ease, opacity .3s ease`,
            })
        }
    }, [currentSession])

    return (
        <div className={'absolute left-0 right-0 h-2 w-full px-2'}>
            <div className={'relative h-full w-full'}>
                <div
                    className={clsx(
                        'absolute bottom-full left-0 h-8 w-7',
                        'opacity-1 z-20 -translate-x-1/2 opacity-0',
                        'bg-[url("/img/dice.svg")] bg-contain bg-no-repeat',
                    )}
                    style={diceStyles}
                >
                    <span
                        className={clsx(
                            'flex h-full w-full items-center justify-center text-[0.625rem] font-medium',
                            !bet || !bet.data ? 'text-black' : win ? 'text-dice-game-lose' : 'text-dice-game-win',
                        )}
                    >
                        {result.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    )
}
