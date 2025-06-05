import clsx from 'clsx'
import { useEffect, useState, useRef } from 'preact/hooks'
import { DiceSliderResult } from './DiceSliderResult'

import { useDiceStore } from '../../lib/diceStore'

export const DiceSlider = () => {
    const { isRollOver, rollProgress, setRollProgress, isDisabled } = useDiceStore()

    const [sliderWidth, setSliderWidth] = useState(0)
    const sliderRef = useRef(null)

    const [divisions, setDivisions] = useState([
        {
            value: 0,
            isPassed: false,
        },
        {
            value: 25,
            isPassed: false,
        },
        {
            value: 50,
            isPassed: false,
        },
        {
            value: 75,
            isPassed: false,
        },
        {
            value: 100,
            isPassed: false,
        },
    ])

    const handleInput = (e) => {
        setRollProgress(Number(e.target.value))
    }

    useEffect(() => {
        setDivisions((prev) =>
            prev.map((item) => ({
                ...item,
                isPassed: isRollOver ? item.value <= rollProgress : item.value >= rollProgress,
            })),
        )
    }, [rollProgress, isRollOver])

    useEffect(() => {
        const resizeWindow = () => {
            const elem = sliderRef.current

            if (elem) {
                setSliderWidth(elem.offsetWidth)
            }
        }

        window.addEventListener('resize', resizeWindow)
        resizeWindow()

        return () => {
            window.removeEventListener('resize', resizeWindow)
        }
    }, [])

    return (
        <>
            <div className="w-full rounded-full border-8 border-dark-500 lg:border-[0.875rem]">
                <div className="relative z-10 flex w-full rounded-full bg-dark-500 p-2 lg:bg-dark-400">
                    <div
                        className={clsx(
                            'absolute -z-[1] h-2 rounded-full',
                            isRollOver ? 'left-2' : 'right-2',
                            isDisabled ? 'bg-dark-gray-400' : 'bg-brand-500',
                        )}
                        style={{
                            width: isRollOver
                                ? sliderWidth * (rollProgress / 100)
                                : sliderWidth - sliderWidth * (rollProgress / 100),
                        }}
                    ></div>
                    <div className={`absolute left-2 right-2 -z-[2] h-2 rounded-full bg-dark-500`}></div>

                    <input
                        ref={sliderRef}
                        className={clsx('my-slider relative z-10', isDisabled && 'pointer-events-none')}
                        type="range"
                        min="0"
                        max="100"
                        value={rollProgress}
                        onInput={handleInput}
                        disabled={isDisabled}
                    />

                    <DiceSliderResult />
                </div>
            </div>
            <div className={'px-[2.3rem]'}>
                <div className={'relative z-[20] w-full pb-3'}>
                    {divisions.map((item) => (
                        <div
                            style={{ left: `${item.value}%`, transform: `translateX(-50%)` }}
                            className={clsx(
                                'my-slider-triangle absolute top-0',
                                'flex flex-col items-center justify-center',
                                'font-medium transition-colors',
                                item.isPassed ? 'text-white' : 'text-white/20',
                            )}
                        >
                            {item.value}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
