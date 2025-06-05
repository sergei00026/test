import clsx from 'clsx'
import { useHiloStore } from '../../lib/hiloStore.js'
import {useConfigStore} from "../../lib/configStore.js";
import {useEffect, useState} from "preact/hooks";

export const HiloChoiseButton = ({ type, disabled = false }) => {
    switch (type) {
        case 'higher':
            return <Higher disabled={disabled} />

        case 'lower':
            return <Lower disabled={disabled} />
    }
}

const Higher = ({ disabled }) => {
    return <Template isLower={true} label={'Higher'} disabled={disabled} />
}

const Lower = ({ disabled }) => {
    return <Template isLower={false} label={'Lower'} disabled={disabled} />
}

const Template = ({ isLower, label, disabled }) => {
    const { clientCard, choice, setChoice, userBet } = useHiloStore()
    let { gameSettings } = useConfigStore()
    const cardKey = isLower ? 'gte' : 'lte'
    const chance = Math.floor(+gameSettings.game_settings.probabilities.find(card => card.card_value === clientCard.value)[cardKey] * 10000) / 100
    const multiplier = Math.floor(+gameSettings.game_settings.multipliers.find(card => card.card_value === clientCard.value)[cardKey] * 100) / 100
    const [isDisabled, setIsDisabled] = useState(disabled)
    useEffect(() => {
        if (userBet || disabled) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [disabled, userBet]);
    return (
        <button
            // className={
            // ((isLower && choice === 'gte') || (!isLower && choice === 'lte')) ?
            //     'scale-105 border-2 hover:brightness-110 flex-1 rounded-lg bg-dark-700'
            //     : 'hover:scale-105 hover:brightness-110 flex-1 rounded-lg bg-dark-700'}
            className={clsx(
                'hover:scale-105 transition-transform duration-300 flex-1 rounded-lg bg-dark-gray-900',
                ((isLower && choice === 'gte') || (!isLower && choice === 'lte')) && 'bg-500-gradient',
                !isDisabled && 'hover:bg-dark-gray-800',
                'transition-colors',
            )}
            onClick={() => setChoice(isLower ? 'gte' : 'lte')}
            disabled={isDisabled}
        >
            <div
                className={clsx(
                    'size-full rounded-[inherit]',
                    'bg-gradient-to-t from-hilo-purple/5 via-hilo-purple/0 to-hilo-purple/0',
                )}
            >
                <div
                    className={clsx(
                        'flex size-full flex-col p-4 text-lg font-bold',
                        ((isLower && choice === 'gte') || (!isLower && choice === 'lte')) ? 'text-dark-gray-900' : 'text-brand-900',
                        disabled && 'text-dark-gray-500',
                    )}
                >
                    <h3 className={clsx('flex items-center justify-between')}>
                        {label} or same

                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                filter:
                                    ((isLower && choice === 'gte') || (!isLower && choice === 'lte')) || disabled
                                        ? 'none'
                                        : 'drop-shadow(0 0 6px rgba(213, 213, 254, 0.2)) drop-shadow(0 0 3px rgba(213, 213, 254, 0.24))',
                            }}
                        >
                            {isLower ? (
                                <path
                                    d="M6.79226 14.7913L6.79226 3.62126L1.91226 8.50126C1.52226 8.89126 0.882265 8.89126 0.492265 8.50126C0.102265 8.11126 0.102264 7.48126 0.492264 7.09126L7.08226 0.501257C7.47226 0.111257 8.10226 0.111257 8.49226 0.501257L15.0923 7.08126C15.4823 7.47126 15.4823 8.10126 15.0923 8.49126C14.7023 8.88126 14.0723 8.88126 13.6823 8.49126L8.79226 3.62126L8.79226 14.7913C8.79226 15.3413 8.34226 15.7913 7.79226 15.7913C7.24226 15.7913 6.79226 15.3413 6.79226 14.7913Z"
                                    fill="currentColor"
                                />
                            ) : (
                                <path
                                    d="M6.79226 1.20874L6.79226 12.3787L1.91226 7.49874C1.52226 7.10874 0.882265 7.10874 0.492265 7.49874C0.102265 7.88874 0.102264 8.51874 0.492264 8.90874L7.08226 15.4987C7.47226 15.8887 8.10226 15.8887 8.49226 15.4987L15.0923 8.91874C15.4823 8.52874 15.4823 7.89874 15.0923 7.50874C14.7023 7.11874 14.0723 7.11874 13.6823 7.50874L8.79226 12.3787L8.79226 1.20874C8.79226 0.65874 8.34226 0.20874 7.79226 0.20874C7.24226 0.20874 6.79226 0.65874 6.79226 1.20874Z"
                                    fill="currentColor"
                                />
                            )}
                        </svg>
                    </h3>

                    <div
                        className={clsx(
                            'mt-auto flex flex-col items-start',
                            'hilo-xl:flex-row hilo-xl:items-center hilo-xl:justify-between',
                        )}
                    >
                        <h3 className={'order-1 text-xl xl:order-none'}>{multiplier.toFixed(2)}x</h3>
                        <h4
                            className={clsx(
                                'mt-6 text-sm hilo-xl:mt-0',
                                ((isLower && choice === 'gte') || (!isLower && choice === 'lte'))
                                    ? 'text-dark-gray-900'
                                    : 'text-dark-gray-400 hilo-xl:text-dark-gray-500',
                            )}
                        >
                            {chance.toFixed(2)} %
                        </h4>
                    </div>
                </div>
            </div>
        </button>
    )
}
