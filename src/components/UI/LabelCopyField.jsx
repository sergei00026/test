import { useState } from 'preact/hooks'
import clsx from 'clsx'

export const LabelCopyField = ({ label = '', className = '', children }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        const val = children?.toString().trim()

        if (!val) return

        navigator.clipboard
            .writeText(val)
            .then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 500)
            })
            .catch((err) => console.error('Copy error: ', err))
    }

    return (
        <div className={clsx('label-field__wrapper', className)}>
            {label && <label className="label-field__label">{label}</label>}
            <p className="label-field__text">{children}</p>

            <button className="ml-1 h-3 w-3 disabled:opacity-40" onClick={handleCopy} disabled={copied}>
                <img src="/img/copy.svg" className="size-full object-contain" alt="" />
            </button>
        </div>
    )
}
