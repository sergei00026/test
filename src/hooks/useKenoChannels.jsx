import { useEffect } from 'preact/hooks'
import { fetchSubscriptionTokens } from '../centrifuge/fetchTokens.js'
import { useConfigStore } from '../lib/configStore.js'
import {useUserStore} from "../lib/userStore.js";

export function useKenoChannels(centrifuge, userId) {
    const { game, setCurrentSession } = useConfigStore()
    const {token} = useUserStore()

    useEffect(() => {
        if (!centrifuge) return

        let subscriptions = []

        async function subscribeKenoChannels() {
            try {
                const subscriptionTokens = await fetchSubscriptionTokens(userId, token)
                const kenoEntries = Object.entries(subscriptionTokens).filter(([channel]) => channel.includes('keno'))

                kenoEntries.forEach(([channel, tokenValue]) => {
                    const token = tokenValue.trim()
                    const sub = centrifuge.newSubscription(channel, { token })

                    sub.on('publication', (ctx) => {
                        const { data } = ctx.data
                        if (game === data.game_name) {
                            setCurrentSession(data, +new Date(ctx.data.timestamp))
                        }
                    })

                    sub.on('subscribing', (ctx) => {
                        // console.log(`[Keno] Subscribing to channel "${channel}"`)
                    })
                    sub.on('subscribed', (ctx) => {
                        // console.log(`[Keno] Subscribed to channel "${channel}"`)
                    })
                    sub.on('unsubscribed', (ctx) => {
                        console.log(
                            `[Keno] Unsubscribed from channel "${channel}": code ${ctx.code}, reason: ${ctx.reason}`,
                        )
                    })

                    // Инициируем подписку
                    sub.subscribe()
                    subscriptions.push(sub)
                })
            } catch (error) {
                console.error('[Keno] Error during subscribing to keno channels:', error)
            }
        }

        subscribeKenoChannels()

        return () => {
            subscriptions.forEach((sub) => {
                sub.unsubscribe()
            })
            subscriptions = []
        }
    }, [centrifuge, userId])
}
