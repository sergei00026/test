import clsx from 'clsx'

import useEmblaCarousel from 'embla-carousel-react'
import { useDiceStore } from '../../lib/diceStore'

export const DiceHistory = ({ gameBlockRef }) => {
    const { gameHistory } = useDiceStore()
    const [emblaRef] = useEmblaCarousel({ dragFree: true })

    return (
        <div className="w-full overflow-hidden">
            <div
                className="mt-5 h-[1.94rem] w-full max-w-full overflow-hidden px-4 xl:max-w-[59.375rem]"
                ref={emblaRef}
            >
                <div className="flex w-full cursor-grab select-none gap-1">
                    {gameHistory.map((item, index) => (
                        <div
                            key={index}
                            className={clsx(
                                'h-[1.94rem] rounded-full px-[0.875rem] py-[0.469rem] text-center text-xs',
                                item.win
                                    ? 'bg-brand-900 text-dice-history-win'
                                    : 'bg-brand-secondary text-dice-history-lose',
                            )}
                        >
                            {item.value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
