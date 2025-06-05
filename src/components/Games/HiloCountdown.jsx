import { useState, useEffect } from 'preact/hooks'
import clsx from 'clsx'
import { Countdown } from '../Countdown'
import {useConfigStore} from "../../lib/configStore.js";

export const HiloCountdown = () => {
    const {currentSession, gameSettings, currentTimestamp} = useConfigStore()
    const totalSeconds = 5

    const [rotation, setRotation] = useState(0)
    // session created - Betting - 5


    useEffect(() => {
        if (!gameSettings) return
        console.log('На статусе с Waiting до Betting: ', gameSettings.period_settings.waiting_period / 1000000)
        console.log('На статусе с Betting до Rolling: ', gameSettings.period_settings.betting_period / 1000000)
        console.log('На статусе с Rolling до Finish: ', gameSettings.period_settings.rolling_period / 1000000)
        console.log('На статусе с Finish до Waiting: ', gameSettings.period_settings.finish_period / 1000000)
    }, [gameSettings])

    const [sessionTimer, setSessionTimer] = useState(0)
    useEffect(() => {
        if (!currentSession) return
        const aliveTime = currentTimestamp - +new Date(currentSession.created_at)
        // console.log('Время жизни сессии: ', aliveTime, 'current timestamp: ', +new Date())
        const firstTimer = (gameSettings.period_settings.waiting_period + gameSettings.period_settings.betting_period) / 1000000
        // console.log('first timer: ', firstTimer)
        const secondTimer = gameSettings.period_settings.rolling_period / 1000000
        // console.log('second timer: ', secondTimer)
        let timerTime = firstTimer - aliveTime
        if (timerTime <= 0) {
            timerTime += secondTimer
            setRotation((state) => state + 180)
        }
        if (Math.round(timerTime / 1000) < Math.round(sessionTimer / 1000)) {
            setRotation((state) => state + 90)
        }
        // console.log('TIMER TIME: ', timerTime)
        setSessionTimer(timerTime)
    }, [currentSession, currentTimestamp, gameSettings])



    // useEffect(() => {
    //     console.log(timeLeft)
    //     if (timeLeft > 0) {
    //         const timer = setTimeout(() => {
    //             setDisableRotationAnim(false)
    //             setTimeLeft((prev) => prev - 1)
    //             setRotation((prev) => prev + 360 / totalSeconds)
    //         }, 1000)
    //
    //         return () => clearTimeout(timer)
    //     } else {
    //         setTimeout(() => {
    //             setTimeLeft(totalSeconds)
    //             setRotation(0)
    //             setDisableRotationAnim(true)
    //         }, 5000)
    //     }
    // }, [timeLeft])

    return (
        <div
            className={clsx(
                'relative w-full h-full max-w-full overflow-hidden rounded-xl bg-hilo-gradient',
                'aspect-[0.732] xl:max-w-60',

                'before:absolute before:left-0 before:top-0 before:size-full',
                'before:z-20 before:rounded-[inherit] before:bg-[url(/img/hilo-top-card-noise.png)]',

                'after:absolute after:left-0 after:right-0 after:z-10 after:size-full after:rounded-[inherit]',
                'after:bg-cover after:bg-no-repeat',
            )}
            //after:bg-[url(/img/hilo-countdown.svg)]
        >
            <div
                className={clsx(
                    'absolute left-0 top-0 z-30 p-4',
                    'flex size-full flex-col rounded-[inherit]',
                    'border-2 border-white/5',
                )}
            >
                <div className={'flex h-full items-center justify-center'}>
                    <Countdown
                        transition={currentSession.state === 'rolling' ? 'transform 0.5s ease' : 'transform 0.5s ease'}
                        rotation={rotation}
                        parentMedia={'w-full aspect-square'}
                        circleMedia={'w-full aspect-square'}
                        textWrapperMedia={'size-[66.5%]'}
                        textMedia={'text-hilo-countdown-text'}
                    >
                        {Math.min(Math.max(Math.round(sessionTimer / 1000), 0), gameSettings.period_settings.betting_period / 1000000000)}
                    </Countdown>
                </div>
            </div>
        </div>
    )
}
