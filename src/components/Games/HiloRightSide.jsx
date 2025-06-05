import {useConfigStore} from "../../lib/configStore.js";
import {HiloCountdown} from "./HiloCountdown.jsx";
import {HiloGameCard} from "./HiloGameCard.jsx";
import {useEffect, useState} from "preact/hooks";
import {useHiloStore} from "../../lib/hiloStore.js";

export const HiloRightSide = () => {
    const {currentSession, gameSettings} = useConfigStore()
    const {addToHistory, historyQueue, setClientCard, history} = useHiloStore()
    const [isCard, setIsCard] = useState(true)
    // useEffect(() => {
    //     let interval = setInterval(() => {
    //         setMoveInLeft(false)
    //         setIsCard((state) => {
    //             return !state
    //         })
    //         console.log('set animate: ', !isCard)
    //
    //     }, 3000)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [])
    useEffect(() => {
        if (currentSession.state === 'rolling' || currentSession.state === 'betting') {
            // setIsCard(false)

            if (isCard) {
                console.log('IS SWIPE NOW')
                setTimeout(() => {
                    if (!historyQueue) {
                        if (history[0].state === 'finished') {
                            setClientCard(history[0].sensitive_data.result_card)
                        }
                    } else {
                        addToHistory(historyQueue)
                        setClientCard(historyQueue.sensitive_data.result_card)
                    }
                }, 500)
            }
        } else {
            setIsCard(true)
        }
    }, [currentSession, historyQueue, history])

    const getCard = (session) => {
        if (session.state === 'finished') {
            return session.sensitive_data.result_card
        }
        return session.public_data.client_card
    }

    return (
        <div class="max-w-full overflow-hidden">
            {
                <div class="flex h-full">
                    <div
                        className={isCard ? 'transition duration-1000 relative w-full max-w-full' : '-translate-x-full transition duration-1000 relative w-full max-w-full'}>
                        <HiloGameCard value={getCard(currentSession).value} suit={getCard(currentSession).suit} />
                    </div>
                    <div
                        className={isCard ? 'transition duration-1000 max-w-full h-full' : '-translate-x-full max-w-full h-full transition duration-1000'}>
                        <HiloCountdown/>
                    </div>
                </div>
            }
        </div>
    )
}
