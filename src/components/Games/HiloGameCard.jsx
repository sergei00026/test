import { useRef, useState, useEffect } from 'preact/hooks'
import clsx from 'clsx'

export const HiloGameCard = ({ value = 2, suit }) => {
    const cardRef = useRef(null)
    const [scale, setScale] = useState(1)

    const suitBackgrounds = {
        spades: 'after:bg-[url(/img/suits/spades.svg)]',
        hearts: 'after:bg-[url(/img/suits/hearts.svg)]',
        diamonds: 'after:bg-[url(/img/suits/diamonds.svg)]',
        clubs: 'after:bg-[url(/img/suits/clubs.svg)]',
    }

    useEffect(() => {
        const card = cardRef.current
        if (!card) return

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const cardWidth = entry.contentRect.width
                const newScale = cardWidth / 240
                setScale(newScale)
            }
        })

        observer.observe(card)

        return () => {
            observer.disconnect()
        }
    }, [])

    const backgroundNumberStyles = {
        // fontSize: `calc(6rem * ${scale})`,
        transformOrigin: 'right top',
        transform: `scale(${scale}) rotate(18deg) translateY(-9px) translateX(14px)`,
        right: `calc(3.5rem * ${scale})`,
    }

    return (
        <div
            className={clsx(
                'relative w-full max-w-full h-full max-h-full overflow-hidden rounded-xl bg-hilo-gradient',
                'aspect-[0.732] hilo-xl:aspect-[none] hilo-xl:max-w-60',

                'before:absolute before:left-0 before:top-0 before:size-full',
                'before:z-20 before:rounded-[inherit] before:bg-[url(/img/hilo-top-card-noise.png)]',

                'after:absolute after:left-0 after:right-0 after:z-10 after:size-full after:rounded-[inherit]',
                'after:bg-[url(/img/hilo-top-card-bg.svg)] after:bg-contain after:bg-no-repeat',
            )}
            ref={cardRef}
        >
            <div
                className={clsx(
                    'absolute left-0 top-0 p-4',
                    'flex size-full flex-col rounded-[inherit]',
                    'border-2 border-white/5',
                )}
            >
                <div
                    className={clsx(
                        'self-start text-4xl font-bold uppercase leading-none',
                        'after:ml-1 after:inline-block after:size-6 after:align-top',
                        'after:bg-contain after:bg-no-repeat',
                        suitBackgrounds[suit],
                    )}
                >
                    {value}
                </div>
                <div
                    className={clsx(
                        'mt-auto self-end text-4xl font-bold uppercase leading-none',
                        'after:ml-1 after:inline-block after:size-6 after:align-top',
                        'after:bg-contain after:bg-no-repeat',
                        suitBackgrounds[suit],
                    )}
                >
                    {value}
                </div>
            </div>
            <div 
                className={clsx(
                    'w-[3.85rem]',
                    'absolute top-0 z-[25]',
                    'pointer-events-none select-none',
                    
                    // '-translate-y-5 rotate-[18deg]'
                    // 'right-14'
                )}
                style={backgroundNumberStyles}
            >
                <h3 className={clsx('text-8xl font-bold leading-none text-dark-600')}>
                    {value}
                </h3>
            </div>
        </div>
    )
}
