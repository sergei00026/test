import {getErrorText} from "../lib/errors.js";

export async function fetchAuthToken(token) {
    const authUrl = `${import.meta.env.VITE_APP_API}/api/centrifugo/connection/token`

    const response = await fetch(authUrl, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'x-auth-token': token,
        },
    })
    if (!response.ok) {
        throw new Error(`Authentication error: ${response.statusText}`)
    }
    const data = await response.json()
    return data.connection_token.trim()
}

export async function fetchSubscriptionTokens(userId, token) {
    const subsUrl = `${import.meta.env.VITE_APP_API}/api/centrifugo/subscription/tokens`

    const subsPayload = {
        channels: [
            `hilo|user|${userId}|bets`,
            `dice|user|${userId}|bets`,
            `keno|user|${userId}|bets`,
            'hilo|sessions',
            'hilo|chat',
            "hilo|live",
            'dice|sessions',
            'keno|sessions',
        ],
    }

    const response = await fetch(subsUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': token,
        },
        body: JSON.stringify(subsPayload),
    })
    if (!response.ok) {
        throw new Error(`Error fetching subscription tokens: ${response.statusText}`)
    }
    const data = await response.json()

    return data.subscription_tokens
}
