import clsx from 'clsx'
import { useState } from 'preact/hooks'
import { DiceInput } from '../UI/DiceInput'

import { useDiceStore } from '../../lib/diceStore'

export const DiceController = () => {
    const { isDisabled, isRollOver, rollProgress, setRollProgress, toggleRollState } = useDiceStore()

    const [multiplier, setMultiplier] = useState(0)
    const [winChance, setWinChance] = useState(0)
    const [payout, setPayout] = useState(0)

    return (
        <div className={'pb-0 lg:pb-5'}>
            <div className={'relative z-10 w-full rounded-md xl:h-32 xl:bg-dark-400'}>
                <div className={'h-full w-full rounded-[inherit] p-[3px] xl:bg-game-controller-gradient'}>
                    <div className={'h-full w-full rounded-[inherit] xl:flex xl:bg-dark-400'}>
                        <div
                            className={clsx(
                                'z-20 mx-auto mt-auto grid grid-cols-2 gap-x-6 gap-y-2 pt-8',
                                'xl:-mb-5 xl:flex xl:gap-x-8 xl:gap-y-0 xl:pt-0',
                            )}
                        >
                            <div className={'xl:w-32'}>
                                <label className={'text-left font-poppins text-base font-medium text-white'}>
                                    Multiplier
                                    <DiceInput
                                        value={multiplier}
                                        onChange={setMultiplier}
                                        type={'number'}
                                        disabled={isDisabled}
                                    />
                                </label>
                            </div>

                            <div className={'xl:w-32'}>
                                <h3 className={'text-left font-poppins text-base font-medium text-white'}>
                                    Win Chance
                                </h3>
                                <DiceInput
                                    value={winChance}
                                    onChange={setWinChance}
                                    type={'number'}
                                    disabled={isDisabled}
                                />
                            </div>

                            <div className={'xl:w-32'}>
                                <h3 className={'text-left font-poppins text-base font-medium text-white'}>
                                    {isRollOver ? 'Roll Over' : 'Roll Under'}
                                </h3>
                                <div className="relative">
                                    <DiceInput
                                        value={rollProgress}
                                        onChange={setRollProgress}
                                        type={'number'}
                                        showSpinnerNumbers={false}
                                        min="0"
                                        max="100"
                                        style={{ paddingRight: '2.2rem' }}
                                        disabled={isDisabled}
                                    />
                                    <button
                                        onClick={toggleRollState}
                                        className={clsx(
                                            'absolute right-2.5 top-1/2 h-5 w-5',
                                            '-translate-y-1/2 rounded-sm bg-dark-600 p-1',
                                        )}
                                        disabled={isDisabled}
                                    >
                                        <img className={'h-full w-full object-contain'} src="/img/refresh.svg" alt="" />
                                    </button>
                                </div>
                            </div>
                            <div className={'xl:w-32'}>
                                <h3 className={'text-left font-poppins text-base font-medium text-white'}>Payout</h3>
                                <DiceInput
                                    value={payout}
                                    onChange={setPayout}
                                    type={'number'}
                                    showSpinnerNumbers={false}
                                    disabled={isDisabled}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
