export const BetSettingsButton = ({ onClick, children, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={'rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white/50'}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
