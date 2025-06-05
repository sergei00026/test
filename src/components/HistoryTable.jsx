import clsx from 'clsx'
import { HistoryTableRow } from './HistoryTableRow'
import {useHiloStore} from "../lib/hiloStore.js";
import {useTableStore} from "../lib/tableStore.js";

const table = {
    headers: [
        {
            title: 'Game',
        },
        {
            title: 'Username',
        },
        {
            title: 'Time',
            xlBreakpoint: true,
        },
        {
            title: 'Bet Amount',
        },
        {
            title: 'Game Result',
        },
        {
            title: 'Payout',
        },
    ],
}

export const HistoryTable = () => {
    const {userBets} = useTableStore()
    return (
        <div className={'mt-5 max-h-[28.875rem] chat-scrollbar'}>
            <div className={'flex w-full flex-col gap-y-2'}>
                <div
                    className={clsx(
                        'relative grid w-full gap-y-2',
                        'grid-cols-[4rem_1fr_6rem_1fr_6rem] lg:grid-cols-5 xl:grid-cols-6',
                    )}
                >
                    {table.headers.map((item, index) => (
                        <div
                            className={clsx(
                                'flex items-center justify-center',
                                item.xlBreakpoint ? 'hidden xl:block' : 'block',
                            )}
                        >
                            <h3
                                key={`table_header_${index}`}
                                className={clsx(
                                    'py-4 text-center text-[0.625rem] font-semibold text-history-table-header',
                                    'lg:text-base',
                                )}
                            >
                                {item.title}
                            </h3>
                        </div>
                    ))}

                    {userBets.filter(item => item.state !== 'pending').map((item, index) => (
                        <HistoryTableRow key={`table_row_${index}`} index={index} data={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}
