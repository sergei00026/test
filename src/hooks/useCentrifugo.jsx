import { useState, useEffect } from 'preact/hooks'
import { Centrifuge } from 'centrifuge'
import { fetchAuthToken } from '../centrifuge/fetchTokens.js'
import {useUserStore} from "../lib/userStore.js";

export function useCentrifugo() {
    const [centrifuge, setCentrifuge] = useState(null)
    const {token} = useUserStore()

    useEffect(() => {
        let c = null
        let isMounted = true

        ;(async () => {
            try {
                if (!token) return
                const connectionToken = await fetchAuthToken(token)

                c = new Centrifuge(`${import.meta.env.VITE_APP_CENTRIFUGO_URL}/connection/websocket`, {
                    token: connectionToken,
                })

                c.on('connecting', (ctx) => {
                    // console.log('[Centrifugo] connecting:', ctx)
                })
                c.on('connected', (ctx) => {
                    // console.log('[Centrifugo] connected via:', ctx.transport)
                })
                c.on('disconnected', (ctx) => {
                    console.log('[Centrifugo] disconnected:', ctx)
                })

                c.connect()
                if (isMounted) {
                    setCentrifuge(c)
                }
            } catch (error) {
                console.error('Error during Centrifugo connection:', error)
            }
        })()

        return () => {
            isMounted = false
            
            if (c) {
                c.disconnect()
            }
        }
    }, [token])

    return centrifuge
}
