import { useEffect } from 'preact/hooks'
import clsx from 'clsx'
import { LiveCounter } from '../LiveCounter'
import { RoundInfo } from '../RoundInfo'

import { KenoTiles } from './KenoTiles'
import { KenoHits } from './KenoHits'
import { KenoMultiplier } from './KenoMultiplier'

import { useConfigStore } from '../../lib/configStore'
import { useKenoStore } from '../../lib/kenoStore'
import { useUserStore } from '../../lib/userStore'
import { useCentrifugo } from '../../hooks/useCentrifugo'
import { useKenoChannels } from '../../hooks/useKenoChannels'

export const Keno = () => {
    const { currentSession } = useConfigStore()
    const { userId } = useUserStore()
    const { selectedTiles } = useKenoStore()

    const centrifuge = useCentrifugo()

    useKenoChannels(centrifuge, userId)

    useEffect(() => {
        if (!currentSession) return

        console.log(currentSession)
    }, [currentSession])

    return (
        <div className={'my-block'}>
            <div className={'absolute left-4 top-4 hidden xl:block'}>
                <LiveCounter />
            </div>
            <RoundInfo />

            <div className="px-2.5 pb-3 pt-5 xl:pb-3 xl:pt-16">
                <KenoTiles />

                {selectedTiles.length !== 0 ? (
                    <>
                        <KenoMultiplier />

                        <KenoHits />
                    </>
                ) : (
                    <div
                        className={clsx(
                            'mx-auto mt-4 rounded bg-dark-500 p-4 text-center',
                            'text-xs font-semibold leading-none',
                            'max-w-[20.375rem] min-[600px]:max-w-[37.5rem] min-[896px]:max-w-[55.25rem]',
                        )}
                    >
                        Select 1 - 10 numbers to play
                    </div>
                )}
            </div>
        </div>
    )
}
