import { clsx } from 'clsx'

import { LabelCopyField } from './UI/LabelCopyField'
import { useModalsStore } from '../lib/modalsStore'

import { modals } from '../constants/modalsList'
import {capitalize} from "../helpers/letters.js";

export const HistoryTablePopUp = ({ showPopup, setShowPopup, data }) => {
    console.log('data: ', data)
    const parentClasses = `absolute left-1/2 bottom-1/2 -translate-x-1/2 max-w-96 w-full pb-3 transition-[visibility] duration-300 ${
        showPopup ? 'visible' : 'invisible'
    }`

    const popupClasses = `relative w-full cursor-default z-40 shadow-2xl transition-[opacity,transform] duration-300 z-10 ${
        showPopup ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-1'
    }`

    const { openModal } = useModalsStore()

    const handleOpenModal = (e) => {
        e.stopPropagation()
        openModal(modals.integrityCheck, { id: data.session.id, hash: data.session.hash, salt: data.session.salt })
        setShowPopup(false)
    }

    return (
        <div className={parentClasses}>
            <div className={popupClasses}>
                <div className={'flex items-center gap-2.5 rounded-t-xl bg-dark-600 px-3 py-4 text-left'}>
                    <span className={'text-sm leading-none'}>{new Date(data.updated_at).toLocaleDateString()}</span>
                    <span className={'text-sm leading-none text-gray-secondary'}>{new Date(data.updated_at).toLocaleTimeString()}</span>
                </div>
                <div className={'flex flex-col gap-3 rounded-b-xl bg-dark-650 px-2.5 py-3'}>
                    <div className={'flex items-center justify-between'}>
                        <span className={'text-sm font-medium text-gray-secondary'}>Round ID</span>
                        <span>
                            <LabelCopyField>{data.session.id}</LabelCopyField>
                        </span>
                    </div>
                    <div className={'flex items-center justify-between'}>
                        <span className={'text-sm font-medium text-gray-secondary'}>Your Choice</span>
                        <span
                            className={clsx(
                                'text-gray-secondary',
                                'flex items-center gap-1',
                                'text-sm font-medium',
                                'before:block before:size-3 before:bg-[url(/img/small-cube.svg)]',
                            )}
                        >
                            {capitalize(data?.data?.comparison)} {data?.session?.public_data?.client_card?.value} {data?.session?.public_data?.client_card?.suit}
                        </span>
                    </div>
                    <div className={'flex items-center justify-between'}>
                        <span className={'text-sm font-medium text-gray-secondary'}>Result card</span>
                        <span className={'text-sm font-medium text-gray-secondary'}>{data?.session?.sensitive_data?.result_card?.value} {data?.session?.sensitive_data?.result_card?.suit}</span>
                    </div>
                    <div className={'flex items-center justify-between'}>
                        <span className={'text-sm font-medium text-gray-secondary'}>Bet amount</span>
                        <span className={'text-sm font-medium'}>{data.bet_amount}</span>
                    </div>
                    <div className={'flex items-center justify-between'}>
                        <span className={'text-sm font-medium text-gray-secondary'}>Game Result</span>
                        <span className={'text-sm font-medium'}>{capitalize(data.state)}</span>
                    </div>
                    <div className={'flex items-center justify-between'}>
                        <span className={'text-sm font-medium text-gray-secondary'}>Win</span>
                        <span className={'text-sm font-medium text-gray-secondary'}>{data.win_amount}</span>
                    </div>
                    <div>
                        <button
                            onClick={handleOpenModal}
                            className={clsx(
                                'flex items-center justify-center gap-2',
                                'w-full rounded-lg p-2.5',
                                'text-sm font-semibold',
                                'border border-gray-secondary/5 bg-gray-secondary/15',
                            )}
                        >
                            Check results
                            <span className={'inline-block size-7'}>
                                <img
                                    src="/img/protected.svg"
                                    className={'pointer-events-none size-full object-contain'}
                                    alt=""
                                />
                            </span>
                        </button>
                    </div>
                </div>
                <span
                    className={clsx(
                        'absolute left-1/2 top-full -z-[1] -translate-x-1/2 translate-y-3 rotate-180',
                        'history-table-popup-triangle',
                    )}
                ></span>
            </div>
        </div>
    )
}
