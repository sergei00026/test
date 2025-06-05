import { BetSettingsButton } from './BetSettingsButton'
import {useUserStore} from "../lib/userStore.js";

export const BetSettingsAmount = ({ betAmount, setBet, divideBet, doubleBet, maxBet, disabled }) => {
    const {balance} = useUserStore()
    return (
        <div>
            <div className={'text-font-muted flex justify-between text-xs font-semibold'}>
                <h3>Bet Amount</h3>
                <p className={'balance'}>{balance}</p>
            </div>
            <div
                className={
                    'bet-settings-input-icon-usd relative mt-1.5 flex items-center rounded-md bg-dark-500 px-1 py-1 pl-8 before:left-2.5'
                }
            >
                <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBet(Number(e.target.value))}
                    className={'text-font-muted w-full bg-transparent pr-2 text-xs font-semibold leading-5'}
                />
                <div className={'flex gap-x-1'}>
                    <BetSettingsButton disabled={disabled} onClick={divideBet}>1/2</BetSettingsButton>
                    <BetSettingsButton disabled={disabled} onClick={doubleBet}>x2</BetSettingsButton>
                    <BetSettingsButton disabled={disabled} onClick={maxBet}>Max</BetSettingsButton>
                </div>
            </div>
        </div>
    )
}
