import { useEffect } from 'preact/hooks'
import { fetchSubscriptionTokens } from '../centrifuge/fetchTokens.js'

import { useConfigStore } from '../lib/configStore.js'
import {useUserStore} from "../lib/userStore.js";

export function useDiceChannels(centrifuge, userId) {

    const { game, setCurrentSession } = useConfigStore()
    const {token} = useUserStore()

    useEffect(() => {
        if (!centrifuge) return

        let subscriptions = []

        async function subscribeDiceChannels() {
            try {
                const subscriptionTokens = await fetchSubscriptionTokens(userId, token)
                const diceEntries = Object.entries(subscriptionTokens).filter(([channel]) => channel.includes('dice'))

                diceEntries.forEach(([channel, tokenValue]) => {
                    const token = tokenValue.trim()
                    const sub = centrifuge.newSubscription(channel, { token })

                    sub.on('publication', (ctx) => {
                        // console.log(`[Dice] Message on channel "${channel}":`, ctx.data)

                        const { data } = ctx.data

                        if (game === data.game_name) {
                            setCurrentSession(data, +new Date(ctx.data.timestamp))
                        }

                        // const sessionState = data.state

                        // setSessionState(data)
                        // setSession(data)

                        // console.log(`[Dice] Session state updated to: ${sessionState}`)
                    })

                    sub.on('subscribing', (ctx) => {
                        // console.log(`[Dice] Subscribing to channel "${channel}":`, ctx)
                    })
                    sub.on('subscribed', (ctx) => {
                        // console.log(`[Dice] Subscribed to channel "${channel}":`, ctx)
                    })
                    sub.on('unsubscribed', (ctx) => {
                        console.log(
                            `[Dice] Unsubscribed from channel "${channel}": code ${ctx.code}, reason: ${ctx.reason}`,
                        )
                    })

                    sub.subscribe()
                    subscriptions.push(sub)
                })
            } catch (error) {
                console.error('[Dice] Error during subscribing to dice channel:', error)
            }
        }

        subscribeDiceChannels()

        return () => {
            subscriptions.forEach((sub) => {
                sub.unsubscribe()
            })
            subscriptions = []
        }
    }, [centrifuge, userId])
}
