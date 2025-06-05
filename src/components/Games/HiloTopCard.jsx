import clsx from 'clsx'

export const HiloTopCard = ({ suit, number }) => {
    const suitBackgrounds = {
        spades: 'after:bg-[url(/img/suits/spades.svg)]',
        hearts: 'after:bg-[url(/img/suits/hearts.svg)]',
        diamonds: 'after:bg-[url(/img/suits/diamonds.svg)]',
        clubs: 'after:bg-[url(/img/suits/clubs.svg)]',
    }

    return (
        <div
            className={clsx(
                'relative h-[6.75rem] w-20 rounded bg-hilo-gradient',

                'before:absolute before:left-0 before:top-0 before:z-10 before:size-full before:rounded-[inherit]',
                'before:bg-[url(/img/hilo-top-card-noise.png)] before:bg-contain before:bg-no-repeat',

                'after:absolute after:left-0 after:right-0 after:z-20 after:size-full after:rounded-[inherit]',
                'after:bg-[url(/img/hilo-top-card-bg.svg)] after:bg-contain after:bg-no-repeat',
            )}
        >
            <div
                className={clsx(
                    'absolute left-0 top-0 z-30 flex size-full flex-col px-1 py-[6px]',
                    'rounded-[inherit] border-2 border-white/5',
                )}
            >
                <div
                    className={clsx(
                        'self-start text-2xl font-bold uppercase leading-none',
                        'after:ml-1 after:inline-block after:size-4 after:align-top',
                        'after:bg-contain after:bg-center after:bg-no-repeat',
                        suitBackgrounds[suit],
                    )}
                >
                    {number}
                </div>
                <div
                    className={clsx(
                        'mt-auto self-end text-2xl font-bold uppercase leading-none',
                        'after:ml-1 after:inline-block after:size-4 after:align-top',
                        'after:bg-contain after:bg-center after:bg-no-repeat',
                        suitBackgrounds[suit],
                    )}
                >
                    {number}
                </div>
            </div>
        </div>
    )
}
