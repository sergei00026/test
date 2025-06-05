import clsx from 'clsx'

export const ToggleSwitch = ({ value, onChange }) => {
    const handleToggle = () => {
        onChange((prev) => !prev)
    }

    return (
        <button
            onClick={handleToggle}
            className={clsx(
                'relative h-[16px] w-[32px] rounded-full',
                'transition-colors duration-300',
                value ? 'bg-brand-900' : 'bg-dark-600',
            )}
        >
            <span
                className={clsx(
                    'absolute left-[2px] top-[2px] h-[12px] w-[12px] transform rounded-full bg-white',
                    'transition-transform duration-300',
                    value ? 'translate-x-[16px]' : 'translate-x-0',
                )}
            ></span>
        </button>
    )
}
