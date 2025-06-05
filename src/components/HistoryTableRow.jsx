import { useEffect, useState, useRef } from 'preact/hooks'
import { HistoryTablePopUp } from './HistoryTablePopUp'
import {capitalize} from "../helpers/letters.js";
import {useUserStore} from "../lib/userStore.js";

export const HistoryTableRow = ({ index, data }) => {
    const {username} = useUserStore();
    const [showPopup, setShowPopup] = useState(false)

    const buttonRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowPopup(false)
            }
        }

        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const baseClasses = `history-table-row-base ${
        index % 2 === 0
            ? 'xl:bg-history-table-ceil-even bg-history-table-ceil-odd'
            : 'xl:bg-history-table-ceil-odd bg-history-table-ceil-odd'
    }`

    const beforeStyles = `history-table-row-before ${
        index % 2 === 0
            ? 'before:xl:bg-history-table-ceil-even before:xl:bg-history-table-ceil-odd'
            : 'before:xl:bg-bg-history-table-ceil-odd before:bg-history-table-ceil-odd'
    }`

    const winClasses = data.win
        ? 'after:absolute after:left-0 after:w-full after:h-[3.375rem] after:bg-700-gradient-stroke after:xl:rounded-xl after:rounded-lg after:-z-[1]'
        : ''

    return (
        <>
            <div className={'py-px pl-px'}>
                <button ref={buttonRef} className={'history-table-clickable'} onClick={() => setShowPopup(true)}>
                    <div className={'relative size-full'}>
                        <HistoryTablePopUp data={data} showPopup={showPopup} setShowPopup={setShowPopup} />
                    </div>
                </button>
                <div className={`${baseClasses} ${beforeStyles} rounded-s-lg xl:rounded-s-xl ${winClasses}`}>
                    {capitalize('hilo')}
                </div>
            </div>
            <div className={'py-px'}>
                <div className={baseClasses}>{username}</div>
            </div>
            <div className={'hidden py-px xl:block'}>
                <div className={baseClasses}>{new Date(data.updated_at).toLocaleDateString()}</div>
            </div>
            <div className={'py-px'}>
                <div className={baseClasses}>
                    <span className={'balance'}>{data.bet_amount}</span>
                </div>
            </div>
            <div className={'py-px'}>
                <div className={baseClasses}>{capitalize(data.state)}</div>
            </div>
            <div className={'py-px pr-px'}>
                <div className={`${baseClasses} rounded-e-lg xl:rounded-e-xl`}>
                    <span className={'balance'}>{data.win_amount}</span>
                </div>
            </div>
        </>
    )
}
