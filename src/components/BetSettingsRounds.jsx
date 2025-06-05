import { useState } from 'preact/hooks'

import { BetSettingsButton } from './BetSettingsButton'
import { ToggleSwitch } from './UI/ToggleSwitch'

export const BetSettingsRounds = () => {
    const [rounds, setRounds] = useState(0)

    const [autoBet, setAutoBet] = useState(false)

    const setRoundsValue = (value) => {
        setRounds(value)
    }

    return (
        <div>
            <div className={'text-font-muted flex justify-between text-xs font-semibold'}>
                <h3>Number of round</h3>

                <div className={'flex items-center'}>
                    <h3 className={'mr-1.5'}>Autobet</h3>
                    <ToggleSwitch value={autoBet} onChange={setAutoBet} />
                </div>
            </div>
            <div className={'mt-1.5 flex items-center rounded-md bg-dark-500 px-1 py-1 pl-2.5'}>
                <input
                    type="number"
                    value={rounds}
                    onChange={(e) => setRounds(Number(e.target.value))}
                    className={'text-font-muted w-full bg-transparent pr-2 text-xs font-semibold leading-5'}
                />
                <div className={'flex gap-x-1'}>
                    <BetSettingsButton onClick={() => setRoundsValue(25)}>25</BetSettingsButton>
                    <BetSettingsButton onClick={() => setRoundsValue(50)}>50</BetSettingsButton>
                    <BetSettingsButton onClick={() => setRoundsValue(100)}>100</BetSettingsButton>
                </div>
            </div>
        </div>
    )
}
