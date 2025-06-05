import {useEffect, useState} from 'preact/hooks'
import {LiveCounter} from '../LiveCounter'
import {HiloTop} from './HiloTop'
import {HiloGame} from './HiloGame'
import {HiloNotification} from './HiloNotification'
import {useUserStore} from '../../lib/userStore.js'
import {useConfigStore} from '../../lib/configStore.js'
import {useDiceStore} from '../../lib/diceStore.js'
import {useChatStore} from '../../lib/chatStore.js'
import {useCentrifugo} from '../../hooks/useCentrifugo.jsx'
import {useHiloChannels} from '../../hooks/useHiloChannels.jsx'
import {useHiloStore} from '../../lib/hiloStore.js'
import {useGetBet} from '../../hooks/useGetBet.jsx'
import {useGetSettings} from '../../hooks/useGetSettings.jsx'
import {fetchSessions} from "../../lib/api.js";
import {useTableStore} from "../../lib/tableStore.js";

export const Hilo = () => {
    const {userId, token} = useUserStore()
    const {game, currentSession, setSettings, gameSettings} = useConfigStore()
    const {openChat} = useChatStore()
    const {notificationBalance, setUserBet, clientCard, setClientCard, setHistory, history} = useHiloStore()
    const {getBet} = useGetBet()
    const {getSettings} = useGetSettings()
    const {setUserBets} = useTableStore()

    const centrifuge = useCentrifugo()

    useHiloChannels(centrifuge, userId)

    useEffect(() => {
        if (!currentSession) return

        const {state} = currentSession

        if (state === 'waiting') {
            setUserBet(null)
        }
    }, [currentSession])

    useEffect(() => {
        (async () => {
            const sessions = await fetchSessions('hilo')
            if (!clientCard) {
                setClientCard(sessions[0].public_data.client_card)
            }
            setHistory([...history, ...sessions.filter(item => item.state === 'finished')])
            console.log('HISTORY: ', history)
        })()
    }, [])

    // fetch bet & game settings
    useEffect(() => {
        const fetchBet = async () => {
            if (token) {
                const {bets} = await getBet({game})
                console.log('Bets: ', bets)
                const foundBet = bets.find((bet) => bet.state === 'pending')
                setUserBet(foundBet)
                setUserBets(bets)
                console.log('Penging Bet', foundBet)
            }
        }

        const fetchGameSettings = async () => {
            if (token) {
                const response = await getSettings({game})

                console.log('Game Settings: ', response)
                setSettings(response)
            }
        }
        fetchBet()
        fetchGameSettings()
    }, [token])

    return (
        gameSettings && clientCard && token && currentSession ?
            (
                <div style={'grid-area: header;'} className={'my-block overflow-hidden'}>
                    {/*<div className="hilo-xl:block absolute left-4 top-4 hidden">*/}
                    {/*    /!*<LiveCounter />*!/*/}
                    {/*</div>*/}
                    <div className={'flex flex-col bg-hilo-game p-0 hilo-xl:px-5 hilo-xl:pb-20 hilo-xl:pt-5 pt-3'}>
                        <HiloTop/>

                        <div className={'relative hilo-xl:pt-[4.5rem]'}>
                            {notificationBalance === 0 ? '' : <HiloNotification amount={notificationBalance}/>}
                            <HiloGame/>
                        </div>
                    </div>
                </div>
            )
            :
            ''

    )
}
