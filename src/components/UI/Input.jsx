import clsx from 'clsx'

export const Input = ({ value, onChange, className = '', placehodler = '', ...props }) => {
    return (
        <input
            type="text"
            className={clsx(
                'rounded-md bg-dark-500 px-3 py-2.5',
                'font-sans text-sm font-normal leading-none',
                'placeholder:text-gray-secondary',
                className,
            )}
            value={value}
            onChange={onChange}
            placeholder={placehodler}
            {...props}
        />
    )
}
