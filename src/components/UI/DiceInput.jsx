export const DiceInput = ({ type = 'text', value, onChange, disabled = false, ...props }) => {
    const defaultOnChange = (e) => {
        console.warn('onChange not passed. Current value:', e.target.value)
    }
    const handledValue = value ?? ''
    const handleChange = onChange ?? defaultOnChange

    const renderInput = () => {
        switch (type) {
            case 'text':
                return <DefaultInput value={handledValue} onChange={handleChange} disabled={disabled} {...props} />
            case 'number':
                return <NumberInput value={handledValue} onChange={handleChange} disabled={disabled} {...props} />
            default:
                return <DefaultInput value={handledValue} onChange={handleChange} disabled={disabled} {...props} />
        }
    }

    return renderInput()
}

const DefaultInput = ({ value, onChange, className = '', ...props }) => {
    return <input value={value} onChange={onChange} type="text" className={`my-input-dice ${className}`} {...props} />
}

const NumberInput = ({
    value,
    onChange,
    showSpinnerNumbers = true,
    className = '',
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    disabled = false,
    ...props
}) => {
    const increment = () => {
        const currentValue = Number(value)
        if (currentValue < max) {
            onChange(currentValue + 1)
        }
    }

    const decrement = () => {
        const currentValue = Number(value)
        if (currentValue > min) {
            onChange(currentValue - 1)
        }
    }

    const handleChange = (e) => {
        const newValue = Number(e.target.value)
        if (newValue >= min && newValue <= max) {
            onChange(newValue)
        } else if (newValue < min) {
            onChange(min)
        } else if (newValue > max) {
            onChange(max)
        }
    }

    return (
        <div className={'relative'}>
            <input
                value={value}
                onChange={handleChange}
                type="number"
                className={`my-input-dice my-input-dice-number ${showSpinnerNumbers ? 'my-input-dice-number-pr' : ''} ${className}`}
                disabled={disabled}
                {...props}
            />
            {showSpinnerNumbers && (
                <>
                    <button
                        className={
                            'absolute right-6 top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center'
                        }
                        onClick={increment}
                        disabled={disabled}
                    >
                        <img
                            className={'pointer-events-none h-full w-full select-none'}
                            src="/img/dice-input-arrow-up.svg"
                            alt=""
                        />
                    </button>

                    <button
                        className={
                            'absolute right-2.5 top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center'
                        }
                        onClick={decrement}
                        disabled={disabled}
                    >
                        <img
                            className={'pointer-events-none h-full w-full select-none'}
                            src="/img/dice-input-arrow-down.svg"
                            alt=""
                        />
                    </button>
                </>
            )}
        </div>
    )
}
