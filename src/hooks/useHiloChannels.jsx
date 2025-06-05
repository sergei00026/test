import { useEffect } from 'preact/hooks'
import { fetchSubscriptionTokens } from '../centrifuge/fetchTokens.js'
import { useConfigStore } from '../lib/configStore.js'
import {useHiloStore} from "../lib/hiloStore.js";
import {useTableStore} from "../lib/tableStore.js";
import {useChatStore} from "../lib/chatStore.js";
import {useUserStore} from "../lib/userStore.js";

export function useHiloChannels(centrifuge, userId) {
    const { token, setBalance } = useUserStore()
    const { game, setCurrentSession, currentSession } = useConfigStore()
    const { messages, addMessage, addStartMessages } = useChatStore()
    const  {setNotificationBalance, setFirstClientCard, setHistoryQueue} = useHiloStore()
    const {addToUserBets} = useTableStore()

    useEffect(() => {
        if (!centrifuge || !userId) return

        let subscriptions = []

        async function subscribeHiloChannels() {
            try {
                const subscriptionTokens = await fetchSubscriptionTokens(userId, token)
                const hiloEntries = Object.entries(subscriptionTokens).filter(([channel]) => channel.includes('hilo'))

                hiloEntries.forEach(([channel, tokenValue]) => {
                    const token = tokenValue.trim()
                    const sub = centrifuge.newSubscription(channel, { token })
                    sub.on('subscribed', (ctx) => {
                        if (ctx.channel.endsWith('|sessions')) {
                            sub.history({limit: 1, reverse: true}).then((result) => {
                                console.log('SESSIONS HISTORY: ', result)
                                if (!currentSession) {
                                    setCurrentSession(result.publications[0].data.data, +new Date(result.publications[0].data.timestamp))
                                }
                            })
                        }
                        if (ctx.channel.endsWith('|chat')) {
                            sub.history({limit: 50, reverse: true}).then((result) => {
                                console.log('PUBLICATIONS HISTORY: ', result.publications.map(item => item.data.data).reverse())
                                addStartMessages(result.publications.map(item => item.data.data).reverse())
                            })
                        }
                    })
                    sub.on('publication', (ctx) => {
                        // console.log('publication', ctx)
                        if (ctx.channel === 'hilo|chat') {
                            console.log('chat: ', ctx.data.data)
                            addMessage(ctx.data.data)
                        }
                        if (ctx.channel === 'hilo|sessions') {
                            // console.log('============')
                            // console.log('currentSession card public: ', ctx.data.data.public_data.client_card.value, ctx.data.data.public_data.client_card.suit)
                            // console.log('currentSession card sensitive: ', ctx.data.data.sensitive_data && ctx.data.data.sensitive_data.result_card.value, ctx.data.data.sensitive_data && ctx.data.data.sensitive_data.result_card.suit)
                            //
                            // console.log('============')

                            if (ctx.data.data.state === 'finished') {
                                // console.log('add to history: ', ctx.data.data)
                                setHistoryQueue(ctx.data.data)
                                setFirstClientCard(ctx.data.data.sensitive_data.result_card)
                            } else {
                                setFirstClientCard(ctx.data.data.public_data.client_card)
                            }
                            setCurrentSession(ctx.data.data, +new Date(ctx.data.timestamp))
                        } else if (ctx.data.event_type === 'bet_win' || ctx.data.event_type === 'bet_lose') {
                            const winAmount = ctx.data.event_type === 'bet_win' ? +ctx.data.data.win_amount : -ctx.data.data.bet_amount
                            setNotificationBalance(winAmount)
                            setTimeout(() => {
                                setNotificationBalance(0)
                            }, 4000)
                            addToUserBets({
                                id: ctx.data.data.id,
                                state: ctx.data.data.state,
                                bet_amount: ctx.data.data.bet_amount,
                                updated_at: ctx.data.data.updated_at,
                                win_amount: ctx.data.data.win_amount,
                                game_name: 'hilo',
                                session: ctx.data.data.session,
                                data: ctx.data.data.data,
                            })
                            setBalance(+ctx.data.data.user_balance)
                        } else if (ctx.data.event_type === 'bet_created' || ctx.data.event_type === 'bet_cancelled') {
                            setBalance(+ctx.data.data.user_balance)
                        }
                    })

                    sub.on('subscribing', (ctx) => {
                        // console.log(`[Hilo] Subscribing to channel "${channel}"`)
                    })
                    sub.on('subscribed', (ctx) => {
                        // console.log(`[Hilo] Subscribed to channel "${channel}"`)
                    })
                    sub.on('unsubscribed', (ctx) => {
                        console.log(
                            `[Hilo] Unsubscribed from channel "${channel}": code ${ctx.code}, reason: ${ctx.reason}`,
                        )
                    })

                    // Инициируем подписку
                    sub.subscribe()
                    subscriptions.push(sub)
                })
            } catch (error) {
                console.error('[Hilo] Error during subscribing to Hilo channels:', error)
            }
        }

        subscribeHiloChannels()

        return () => {
            subscriptions.forEach((sub) => {
                sub.unsubscribe()
            })
            subscriptions = []
        }
    }, [centrifuge, userId])
}
