import clsx from 'clsx'

export const LabelField = ({ label = '', className = '', children }) => {
    return (
        <div className={clsx('label-field__wrapper', className)}>
            {label && <label className="label-field__label">{label}</label>}
            <p className="label-field__text">{children}</p>
        </div>
    )
}