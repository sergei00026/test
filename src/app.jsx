import { useEffect } from 'preact/hooks'
import { Game } from './components/Game'
import { Balance } from './components/Balance'
import { BetSettings } from './components/BetSettings'
import { History } from './components/History'
import { Chat } from './components/Chat'
import { ResponseTop } from './components/ResponseTop'
import { IntegrityCheck } from './modals/IntegrityCheck'

import { useModalsStore } from './lib/modalsStore'
import { useUserStore } from './lib/userStore'
import { modals } from './constants/modalsList'
import {fetchUserInfo} from "./lib/api.js";

export function App() {
    const { activeModals } = useModalsStore()
    const { token, setToken, setUserInfo } = useUserStore()

    useEffect(() => {
        if (Object.keys(activeModals).length > 0) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [activeModals])

    const names = [
        'Грач',
        'rain',
        'Guron 18',
        'Yulya PC-RET',
        'Maddness',
        'erm0ff pidor',
        'zombic14',
        'haker08',
        'd1van4ik',
        'massaka',
        'dolbonaft',
        'Sanya18',
        'Genius Einstein',
        'freezeline',
        'iCore',
        'melanholy',
    ]

    function get_random (list) {
        return list[Math.floor((Math.random()*list.length))];
    }

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get('b')
        if (urlToken) {
            setToken(urlToken)
            return
        }
        const userData = {
            balance: 99999,
            currency: 'USD',
            user_id: crypto.randomUUID(),
            username: get_random(names),
        }

        const createAuthToken = async (userData) => {
            console.log('Fetching user data')
            try {
                const api_url = `${import.meta.env.VITE_APP_API}/api/auth`
                const response = await fetch(api_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch user data')
                }

                return await response.json()
            } catch (error) {
                console.error('Error during auth:', error.message)
                return null
            }
        }

        const getAuthToken = async () => {
            const user = await createAuthToken(userData)
            if (user) {
                console.log('User data!!:', user)
                window.location.replace(`${document.location.href}?b=${user.token}`)
                setToken(user.token)
            }
        }

        getAuthToken()
    }, [])

    useEffect(() => {
        (async () => {
            if (!token) return
            const user = await fetchUserInfo(token)
            setUserInfo(user)
        })()
    }, [token])

    return (
        <div>
            <div className={'h-min-screen mx-auto w-full max-w-app px-2 py-4 xl:py-16'}>
                <div style={`
                    grid-template-areas:
                    "header chat"
                    "footer chat";
                `} className={'flex flex-col gap-x-6 gap-y-3 xl:grid xl:grid-cols-[1fr_22.5rem]'}>
                    <ResponseTop />

                    {token ? <Game/> : ''}

                    <div style={'grid-area: chat;'} className={'mt-5 flex flex-col gap-y-3.5 xl:mt-0'}>
                        {/*<div className={'hidden xl:block'}>*/}
                        {/*    <Balance />*/}
                        {/*</div>*/}

                        <BetSettings />
                        <Chat />

                    </div>

                    <History />

                </div>
            </div>

            {activeModals[modals.integrityCheck] && <IntegrityCheck modalId={modals.integrityCheck} />}
        </div>
    )
}
