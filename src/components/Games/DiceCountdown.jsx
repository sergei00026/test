import { useState, useEffect } from 'preact/hooks'
import { useConfigStore } from '../../lib/configStore'
import { Countdown } from '../Countdown'

export const DiceCountdown = () => {
    const { currentSession } = useConfigStore()

    const totalSeconds = 5

    const [timeLeft, setTimeLeft] = useState(5)
    const [rotation, setRotation] = useState(0)
    const [disableRotationAnim, setDisableRotationAnim] = useState(false)

    useEffect(() => {
        let timer

        const sessionState = currentSession?.state

        if (sessionState === 'betting') {
            setRotation(0)
            setDisableRotationAnim(false)
            setTimeLeft((prev) => prev - 1)
            setRotation((prev) => prev + 360 / totalSeconds)

            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        setDisableRotationAnim(false)
                        return 0
                    }
                    return prev - 1
                })
                setRotation((prev) => prev + 360 / totalSeconds)
            }, 1000)
        }

        if (sessionState === 'finished') {
            setDisableRotationAnim(true)
            setTimeLeft(totalSeconds)
            setRotation(0)
        }

        return () => clearInterval(timer)
    }, [currentSession])

    return (
        <Countdown
            rotation={rotation}
            disableRotationAnim={disableRotationAnim}
            parentMedia={'h-[5.625rem] w-[5.625rem] lg:h-[12.5rem] lg:w-[12.5rem]'}
            circleMedia={'h-[5.625rem] w-[5.625rem] lg:h-[12.5rem] lg:w-[12.5rem]'}
            textWrapperMedia={'h-[3.75rem] w-[3.75rem] lg:h-32 lg:w-32'}
            textMedia={'text-[2.5rem] lg:text-8xl'}
        >
            {timeLeft}
        </Countdown>
    )
}
