import { clsx } from 'clsx'

export const BetButton = ({ onClick, className = '', disabled = false, betPlaced = false, children }) => {
    return (
        <button
            className={clsx(
                'inline-block rounded-[0.6em] px-[1.5em] py-[0.65em] font-bold',
                'mt-5 w-full border text-2xl leading-none',
                'disabled:opacity-30',
                betPlaced ? 'bg-500-gradient-alert border-btn-stoke-alert' : 'border-btn-stoke bg-500-gradient',
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
