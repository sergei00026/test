import { useConfigStore } from '../lib/configStore'
import { Dice } from './Games/Dice'
import { Keno } from './Games/Keno'
import { Hilo } from './Games/Hilo'

export const Game = () => {
    // const { game } = useConfigStore()

    const currentGame = window.location.pathname.replaceAll('/', '')


    switch (currentGame) {
        case 'dice':
            return <Dice />
        case 'keno':
            return <Keno />
        case 'hilo':
            return <Hilo />
        default:
            return listGames()
    }
}

function listGames() {
    const games = [
        { name: 'Dice', path: '/dice' },
        { name: 'Keno', path: '/keno' },
        { name: 'Hilo', path: 'test/hilo' },
    ]

    return (
        <div>
            <h1>Game not found</h1>
            <h2>Available Games:</h2>
            <ul>
                {games.map((game) => (
                    <li key={game.path}>
                        <a href={game.path}>{game.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}