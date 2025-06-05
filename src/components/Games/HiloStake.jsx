import clsx from 'clsx'

export const HiloStake = () => {
    return (
        <div
            className={clsx(
                'mt-6 flex items-center justify-between',
                'rounded-lg border border-gray-secondary/10 px-4 py-2.5',
                'bg-dark-700 hilo-xl:bg-transparent',
            )}
        >
            <div>
                <span className={'text-base font-medium text-gray-secondary'}>Stake: </span>
                <span className={'text-base font-bold text-brand-900'}>10 USD</span>
            </div>

            <button
                className={clsx(
                    'flex items-center border border-gray-secondary/20 py-1.5 pl-4 pr-2',
                    'text-sm font-medium leading-none text-gray-secondary',
                    'rounded-full hilo-xl:rounded-lg',

                    'after:ml-[2px] after:inline-block after:size-5',
                    'after:bg-[url(/img/hilo-stake-arrow.svg)] after:bg-contain after:bg-center',
                )}
            >
                Cashout
            </button>
        </div>
    )
}
