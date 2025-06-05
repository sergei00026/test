import {useState} from 'preact/hooks'

import {useUserStore} from '../lib/userStore'
import {getErrorText} from "../lib/errors.js";

export const useCreateBet = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { token } = useUserStore()

    const createBet = async ({ game, session_id, body }) => {
        try {
            setIsLoading(true)
            setError(null)

            const api_url = `${import.meta.env.VITE_APP_API}/api/${game}/sessions/${session_id}/bet`
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify(body),
            })
            const json = await response.json()
            if (json.error_code) {
                setError(getErrorText(json.error_code))
            }

            return json
        } catch (error) {
            console.error(error)
            setError(json.error_code)
        } finally {
            setIsLoading(false)
            setTimeout(() => setError(null), 5000)
        }
    }

    return { isLoading, createBet, error }
}
