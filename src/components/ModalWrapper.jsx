import { useEffect, useState } from 'preact/hooks'
import { clsx } from 'clsx'
import { useModalsStore } from '../lib/modalsStore'

export const ModalWrapper = ({ modalId, className = '', animDuration = 300, children }) => {
    const { modals, closeModal } = useModalsStore()
    const [isMounted, setIsMounted] = useState(false)
    
    useEffect(() => {
        setIsMounted(modals[modalId])
    }, [modals])

    const handleClose = () => {
        closeModal(modalId, animDuration)
    }

    return (
        <div
            style={{
                '--anim-duration': `${animDuration}ms`,
            }}
            className={clsx(
                'fixed left-0 top-0 z-[100] h-dvh w-full',
                'transition-colors duration-[var(--anim-duration)]',
                isMounted ? 'bg-modal-overlay/50' : 'bg-modal-overlay/0',
            )}
            data-modalid={modalId}
            onClick={handleClose}
        >
            <div className={'flex size-full overflow-auto px-2 py-5'}>
                <div
                    className={clsx(
                        className,
                        'm-auto transition-[transform,opacity] duration-[var(--anim-duration)] overflow-hidden',
                        isMounted ? 'opacity-1 translate-y-0' : 'translate-y-1 opacity-0',
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}