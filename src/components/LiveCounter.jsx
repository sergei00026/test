import clsx from 'clsx'

export const LiveCounter = () => {
    return (
        <div
            className={clsx(
                'inline-flex rounded-[10px] bg-500-gradient px-2 py-1',
                'pointer-events-none select-none',
                'text-base leading-none',
            )}
        >
            <span
                className={clsx(
                    'flex items-center',
                    'before:mr-1 before:inline-block before:h-[5px] before:w-[5px] before:rounded-full before:bg-white',
                )}
            >
                Live
            </span>
            <span className={'flex items-center before:mx-2 before:h-full before:w-[1px] before:bg-white'}>
                <img src="/img/live-people.svg" className={'mr-1'} alt="" />
                38
            </span>
        </div>
    )
}
