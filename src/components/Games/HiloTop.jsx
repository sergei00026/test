import clsx from 'clsx'
import { useEffect, useState, useRef } from 'preact/hooks'
import { HiloTopCard } from './HiloTopCard'
import {fetchSessions} from "../../lib/api.js";
import {useHiloStore} from "../../lib/hiloStore.js";

export const HiloTop = () => {
    const [index, setIndex] = useState(0)
    const [transformWrapper, setTransformWrapper] = useState(0)
    const {history} = useHiloStore()
    const rowHeight = 108
    const gap = 10
    const cardsLength = 20
    const maxIndex = Math.floor(cardsLength / 8)

    const updateIndex = (newIndex) => {
        return (rowHeight * newIndex + gap * newIndex) * -1
    }

    const handleScrollTopButton = () => {
        if (index <= 0) {
            return
        }

        const newIndex = index - 1
        setIndex(newIndex)

        const calcTransform = updateIndex(newIndex)
        setTransformWrapper(calcTransform)
    }

    const handleScrollBottomButton = () => {
        if (index >= maxIndex) {
            return
        }

        const newIndex = index + 1
        setIndex(newIndex)

        const calcTransform = updateIndex(newIndex)
        setTransformWrapper(calcTransform)
    }

    return (
        <div
            style={{
                'scrollbar-width': 'none',
                '--row-height': `${rowHeight}px`, 
                '--transform-wrapper': `${transformWrapper}px`,
                'max-height': `${rowHeight}px`,
            }}
            className={clsx(
                'relative overflow-auto',
                'order-none hilo-xl:mt-0 hilo-xl:overflow-hidden hilo-xl:pb-0',
                'hilo-xl:pl-[8.375rem] hilo-xl:h-[var(--row-height)]'
            )}
        >
            <div
                className={clsx(
                    'flex pb-2',
                    'w-fit px-2',
                    'hilo-xl:translate-y-[var(--transform-wrapper)]',
                    'transition-transform',

                    'grid [grid-template-columns:repeat(8,80px)]',
                    'hilo-xl:w-auto hilo-xl:px-0 hilo-xl:pb-0'
                )}
                style={{ gap }}
            >
                {
                    history.filter(card => card.state === 'finished').map((card) => (
                        <HiloTopCard number={card.sensitive_data.result_card.value} suit={card.sensitive_data.result_card.suit} />
                    ))
                }
            </div>

            <div className={'hilo-xl:flex absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-y-2'}>
                <button
                    className={clsx(
                        'flex size-4 cursor-pointer select-none items-center justify-center',
                        'disabled:cursor-default disabled:opacity-0',
                    )}
                    onClick={handleScrollTopButton}
                    disabled={index === 0}
                >
                    <img src="/img/hilo-top-card-scroll-arrow.svg" alt="" />
                </button>
                <button
                    className={clsx(
                        'flex size-4 cursor-pointer select-none items-center justify-center',
                        'disabled:cursor-default disabled:opacity-0',
                    )}
                    onClick={handleScrollBottomButton}
                    disabled={index === maxIndex}
                >
                    <img src="/img/hilo-top-card-scroll-arrow.svg" alt="" className={'rotate-180'} />
                </button>
            </div>
        </div>
    )
}
