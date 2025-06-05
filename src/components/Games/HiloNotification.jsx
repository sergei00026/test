import clsx from 'clsx'

export const HiloNotification = ({ amount }) => {
    console.log('Hilo Notification amount: ', amount)
    const isWin = amount > 0
    console.log('isWin: ', isWin)

    return (
        <div className={'absolute top-8 z-50 flex w-full items-center justify-center px-3 hilo-xl:top-3.5 hilo-xl:px-0'}>
            <div
                className={clsx(
                    'flex aspect-[1.52] w-full max-w-[29.5rem] items-center justify-center',
                    'hilo-xl:aspect-auto hilo-xl:max-w-[21.5rem]',
                )}
            >
                <div
                    className={clsx(
                        'flex w-full items-center justify-between rounded-lg bg-dark-700 p-3',
                        isWin ? 'shadow-hilo-notification-success' : 'shadow-hilo-notification-declined',
                    )}
                >
                    <h3
                        className={clsx(
                            'flex items-center text-lg font-bold leading-5',
                            'before:mr-1 before:size-5',
                            'before:bg-center before:bg-no-repeat',
                            isWin
                                ? 'before:bg-[url(/img/hilo-check.svg)]'
                                : 'before:bg-[url(/img/hilo-declined.svg)]',
                        )}
                    >
                        {isWin ? 'You won!' : 'You lost'}
                    </h3>

                    <h3
                        className={clsx(
                            'text-lg font-bold leading-5',
                            isWin ? 'text-success' : 'text-alert',
                        )}
                    >
                        {isWin ? `+${amount}` : amount} USDT
                    </h3>
                </div>
            </div>
        </div>
    )
}
