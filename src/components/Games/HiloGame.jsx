import { HiloGameCard } from './HiloGameCard'
import { HiloCountdown } from './HiloCountdown.jsx'

import { HiloChoiseButton } from './HiloChoiseButton'
import { HiloStake } from './HiloStake.jsx'
import { useHiloStore } from '../../lib/hiloStore.js'
import {HiloRightSide} from "./HiloRightSide.jsx";

export const HiloGame = () => {
    const { clientCard } = useHiloStore()

    return (
        <div className={'mx-auto w-full max-w-[31rem] hilo-xl:max-w-[49rem]'}>
            <div className={'rounded-xl hilo-xl:bg-dark-800 hilo-xl:shadow-hilo-bg'}>
                <div className={'rounded-xl hilo-xl:bg-hilo-game'}>
                    <div className={'rounded-xl px-3 py-4 hilo-xl:border-2 hilo-xl:border-white/5 hilo-xl:px-4'}>
                        <div className={'grid grid-cols-2 gap-4 pt-4 hilo-xl:grid-cols-[15rem_1fr_15rem]'}>
                            {clientCard ? <HiloGameCard value={clientCard.value} suit={clientCard.suit} /> : ''}

                            <div className={'hidden flex-1 flex-col gap-2 hilo-xl:flex'}>
                                <HiloChoiseButton type="higher" />
                                <HiloChoiseButton type="lower" />
                            </div>


                            <HiloRightSide />

                            <div className={'col-span-2 flex gap-2 hilo-xl:hidden'}>
                                <HiloChoiseButton type="higher" />
                                <HiloChoiseButton type="lower" />
                            </div>
                        </div>

                        {/*<HiloStake />*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
