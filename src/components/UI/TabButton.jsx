import clsx from 'clsx'

export const TabButton = ({ rounded = 'rounded-md', value, name, onChange, selectedTab, children }) => {
    return (
        <label className="cursor-pointer">
            <div className={clsx('bg-dark-650', rounded)}>
                <div
                    className={clsx(
                        'rounded-[inherit] p-px',
                        value === selectedTab ? 'bg-700-gradient-stroke' : 'bg-transparent',
                    )}
                >
                    <div className="rounded-[inherit] bg-dark-650">{children}</div>
                </div>
                <input
                    value={value}
                    onChange={onChange}
                    checked={value === selectedTab}
                    className="hidden"
                    type="radio"
                    name={name}
                />
            </div>
        </label>
    )
}