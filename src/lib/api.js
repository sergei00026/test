export const fetchSessions = async (game) => {
    const api_url = `${import.meta.env.VITE_APP_API}/api/${game}/sessions?limit=30&offset=0`
    const response = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch sessions')
    }
    const responseBody = await response.json()
    return responseBody.sessions
}

export const sendMessage = async (game, message, token) => {
    const api_url = `${import.meta.env.VITE_APP_API}/api/${game}/chat`
    const response = await fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        },
        body: JSON.stringify({
            message: message,
        }),
    })
    if (!response.ok) {
        throw new Error('Failed to send message')
    }
}

export const fetchUserInfo = async (token) => {
    const api_url = `${import.meta.env.VITE_APP_API}/api/auth/userme`
    const response = await fetch(api_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        },
    })
    if (!response.ok) {
        throw new Error('Failed to send message')
    }
    return await response.json()
}
