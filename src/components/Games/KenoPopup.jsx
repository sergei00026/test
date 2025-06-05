import clsx from 'clsx'

export const KenoPopup = () => {
    return (
        <div
            className={clsx(
                'absolute left-1/2 top-8 min-w-[9.375rem] -translate-x-1/2 p-4',
                'rounded-3xl border-[6px] border-brand-900 bg-dark-500',
            )}
        >
            <h3 className={'text-center text-xl font-bold text-brand-900'}>2.75x</h3>

            <div aria-label="hidden" className={'mx-auto my-4 h-1 w-16 bg-brand-secondary'}></div>

            <h4 className={'balance-right w-full text-center text-sm font-bold text-brand-900'}>0.00000000</h4>
        </div>
    )
}
