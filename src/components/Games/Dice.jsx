import { useEffect } from 'preact/hooks'

import { LiveCounter } from '../LiveCounter'
import { RoundInfo } from '../RoundInfo'
import { DiceCountdown } from './DiceCountdown'
import { DiceSlider } from './DiceSlider'
import { DiceController } from './DiceController'
import { DiceHistory } from './DiceHistory'

import { useChatStore } from '../../lib/chatStore'
import { useConfigStore } from '../../lib/configStore'
import { useDiceStore } from '../../lib/diceStore'
import { useUserStore } from '../../lib/userStore'
import { useCentrifugo } from '../../hooks/useCentrifugo'
import { useDiceChannels } from '../../hooks/useDiceChannels'

export const Dice = () => {
    const { userId } = useUserStore()
    const { currentSession } = useConfigStore()
    const { setDisabledState, bet } = useDiceStore()
    const { openChat } = useChatStore()

    const centrifuge = useCentrifugo()

    useDiceChannels(centrifuge, userId)

    useEffect(() => {
        if (!currentSession) return

        console.log(currentSession)

        const { state } = currentSession

        if (state === 'betting') {
            setDisabledState(false)
        }
    }, [currentSession])

    useEffect(() => {
        console.log(bet)

        if (bet && bet.state !== 'pending') {
            setDisabledState(true)
        }
    }, [bet])

    return (
        <div className={'my-block overflow-hidden pb-4'}>
            <div className={'px-4 pb-0 pt-4'}>
                <div className={'absolute left-4 top-4 hidden xl:block'}>
                    <LiveCounter />
                </div>
                <div className={'absolute right-4 top-4 block xl:hidden'}>
                    <button className={'icon-btn'} onClick={openChat}>
                        <img src="/img/chat.svg" alt="" />
                    </button>
                </div>
                <RoundInfo />

                <DiceCountdown />

                <div className="mx-auto mt-3 w-full max-w-[45rem] lg:mt-11">
                    <DiceSlider />

                    <DiceController />
                </div>
            </div>

            <DiceHistory />
        </div>
    )
}
