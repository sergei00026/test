import clsx from 'clsx'

export const Countdown = ({
    rotation,
    parentMedia,
    circleMedia,
    textWrapperMedia,
    textMedia,
    children,
    transition,
}) => {
    return (
        <div className={clsx('relative z-10 mx-auto flex', 'items-center justify-center rounded-full', parentMedia)}>
            <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className={clsx('absolute left-0 top-0 -z-[1] text-brand-500', circleMedia)}
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: transition,
                }}
            >
                <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                    stroke-dasharray="270 15 125 15 125 15"
                    stroke-dashoffset="-5"
                />
            </svg>

            <div className={clsx('rounded-full border-2 border-white/20 bg-white/5', textWrapperMedia)}>
                <span
                    className={clsx(
                        'flex size-full items-center justify-center',
                        'font-montserrat font-semibold',
                        textMedia,
                    )}
                >
                    {children}
                </span>
            </div>
        </div>
    )
}
