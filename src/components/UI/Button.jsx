import { clsx } from 'clsx'

export const Button = ({ onClick, className = '', disabled = false, children }) => {
    return (
        <button
            className={clsx(
                'inline-block rounded-[0.6em] bg-500-gradient px-[1.5em] py-[0.65em] font-bold',
                'disabled:opacity-30',
                className,
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
