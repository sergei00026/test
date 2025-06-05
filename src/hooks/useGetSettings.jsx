import { useState } from 'preact/hooks'

import { useUserStore } from '../lib/userStore'
import {getErrorText} from "../lib/errors.js";

export const useGetSettings = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { token } = useUserStore()

    const getSettings = async ({ game }) => {
        try {
            setIsLoading(true)
            setError(null)

            const api_url = `${import.meta.env.VITE_APP_API}/api/${game}/settings`
            const response = await fetch(api_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                    'x-auth-token': token,
                }
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
            setIsLoading(false)
        }
    }

    return { isLoading, getSettings, error }
}
