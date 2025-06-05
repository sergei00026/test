import clsx from 'clsx'
import { useState } from 'preact/hooks'
import { TabButton } from './UI/TabButton'
import { HistoryTable } from './HistoryTable'

export const History = () => {
    const topTabs = 'topTabs'
    const activityTabs = 'activityTabs'

    const [topTab, setTopTab] = useState('all_game')
    const [activityTab, setActivityTab] = useState('today')

    const handleChangeTopTab = (event) => {
        setTopTab(event.target.value)
    }

    const handleChangeActivityTab = (event) => {
        setActivityTab(event.target.value)
    }

    return (
        <div>
            {/*<div className={'hidden grid-cols-4 gap-x-1 xl:grid'}>*/}
            {/*    <TabButton value={'all_game'} name={topTabs} onChange={handleChangeTopTab} selectedTab={topTab}>*/}
            {/*        <div className={'p-4 text-center font-poppins text-base text-white'}>All game</div>*/}
            {/*    </TabButton>*/}
            {/*    <TabButton value={'this_game'} name={topTabs} onChange={handleChangeTopTab} selectedTab={topTab}>*/}
            {/*        <div className={'p-4 text-center font-poppins text-base text-white'}>This Game</div>*/}
            {/*    </TabButton>*/}
            {/*    <TabButton value={'history'} name={topTabs} onChange={handleChangeTopTab} selectedTab={topTab}>*/}
            {/*        <div className={'p-4 text-center font-poppins text-base text-white'}>History</div>*/}
            {/*    </TabButton>*/}
            {/*    <TabButton value={'high_rollers'} name={topTabs} onChange={handleChangeTopTab} selectedTab={topTab}>*/}
            {/*        <div className={'p-4 text-center font-poppins text-base text-white'}>High Rollers</div>*/}
            {/*    </TabButton>*/}
            {/*</div>*/}
            {/*<div className={'mt-2 hidden items-end gap-x-2 xl:flex'}>*/}
            {/*    <h3*/}
            {/*        className={clsx(*/}
            {/*            'flex items-end text-xl font-semibold leading-tight',*/}
            {/*            'before:mr-1 before:block before:h-7 before:w-7',*/}
            {/*            'before:bg-[url(/img/crown.svg)] before:bg-contain before:bg-center before:bg-no-repeat',*/}
            {/*        )}*/}
            {/*    >*/}
            {/*        Top:*/}
            {/*    </h3>*/}
            {/*    <div className={'flex gap-x-1'}>*/}
            {/*        <TabButton*/}
            {/*            value={'today'}*/}
            {/*            name={activityTabs}*/}
            {/*            onChange={handleChangeActivityTab}*/}
            {/*            selectedTab={activityTab}*/}
            {/*            rounded={'rounded'}*/}
            {/*        >*/}
            {/*            <div className={'w-[6.25rem] py-1 text-center font-poppins text-[0.625rem] text-white'}>*/}
            {/*                Today*/}
            {/*            </div>*/}
            {/*        </TabButton>*/}
            {/*        <TabButton*/}
            {/*            value={'weeks'}*/}
            {/*            name={activityTabs}*/}
            {/*            onChange={handleChangeActivityTab}*/}
            {/*            selectedTab={activityTab}*/}
            {/*            rounded={'rounded'}*/}
            {/*        >*/}
            {/*            <div className={'w-[6.25rem] py-1 text-center font-poppins text-[0.625rem] text-white'}>*/}
            {/*                Weeks*/}
            {/*            </div>*/}
            {/*        </TabButton>*/}
            {/*        <TabButton*/}
            {/*            value={'months'}*/}
            {/*            name={activityTabs}*/}
            {/*            onChange={handleChangeActivityTab}*/}
            {/*            selectedTab={activityTab}*/}
            {/*            rounded={'rounded'}*/}
            {/*        >*/}
            {/*            <div className={'w-[6.25rem] py-1 text-center font-poppins text-[0.625rem] text-white'}>*/}
            {/*                Months*/}
            {/*            </div>*/}
            {/*        </TabButton>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div style={'grid-area: footer;'}>
                <HistoryTable />
            </div>
        </div>
    )
}
