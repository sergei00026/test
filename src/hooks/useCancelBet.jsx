import { useState } from 'preact/hooks'

import { useUserStore } from '../lib/userStore'
import {getErrorText} from "../lib/errors.js";

export const useCancelBet = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { token } = useUserStore()

    const cancelBet = async ({ game, session_id, bet_id }) => {
        try {
            setIsLoading(true)
            setError(null)

            const api_url = `${import.meta.env.VITE_APP_API}/api/${game}/sessions/${session_id}/bet/${bet_id}`
            const response = await fetch(api_url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    'x-auth-token': token,
                },
            })
            const json = await response.json()
            if (json.error_code) {
                setError(getErrorText(json.error_code))
            }

            return json
        } catch (error) {
            console.error(error)
            setError(error.message)
        } finally {
            setTimeout(() => setError(null), 5000)
            setIsLoading(false)
        }
    }

    return { isLoading, cancelBet, error }
}
