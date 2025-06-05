import {useEffect, useRef, useState} from 'preact/hooks'
import clsx from 'clsx'
import { BetSettingsAmount } from './BetSettingsAmount'
import { BetSettingsRounds } from './BetSettingsRounds'
import { BetButton } from './UI/BetButton'
import 'preact-status-alert/dist/status-alert.css'

import { SoundToggle } from './SoundToggle'

import { useConfigStore } from '../lib/configStore'
import { useChatStore } from '../lib/chatStore'
import { useCreateBet } from '../hooks/useCreateBet'
import { useCancelBet } from '../hooks/useCancelBet'

import { useDiceStore } from '../lib/diceStore'
import { useHiloStore } from '../lib/hiloStore'
import {useUserStore} from "../lib/userStore.js";
import StatusAlert, {StatusAlertService} from "preact-status-alert";

export const BetSettings = () => {
    const { game, currentSession, gameSettings } = useConfigStore()
    const {currency, balance} = useUserStore()
    const { openChat } = useChatStore()
    const { isLoading: betIsLoading, createBet, error: betError } = useCreateBet()
    const { isLoading: cancelIsLoading, cancelBet, error: cancelError } = useCancelBet()
    const [alertId, setAlertId] = useState('')
    useEffect(() => {
        if (!betError) {
            StatusAlertService.removeAlert(alertId)
        } else {
            setAlertId(StatusAlertService.showError(betError))
        }
    }, [betError])
    useEffect(() => {
        console.log('use effect cancel error')
        if (!cancelError) {
            console.log('remove')
            StatusAlertService.removeAlert(alertId)
        } else {
            console.log('shiw: ', cancelError)
            setAlertId(StatusAlertService.showError(cancelError))
        }
    }, [cancelError])

    const { rollProgress, isRollOver, bet: diceUserBet, setBet: setDiceBet } = useDiceStore()
    const { userBet: hiloUserBet, setUserBet: setHiloUserBet, choice } = useHiloStore()
    const [betAmount, setBetAmount] = useState(100)

    const [isBetsDisabled, setIsBetsDisabled] = useState(false)

    useEffect(() => {
        if (currentSession && currentSession.state === 'betting') {
            setIsBetsDisabled(false)
        } else {
            setIsBetsDisabled(true)
        }
    }, [currentSession])

    const [currencySettings, setCurrencySettings] = useState(null)
    useEffect(() => {
        console.log('g s: ', gameSettings)
        if (!gameSettings || !currency) return
        console.log('a', gameSettings.supported_currencies.find(item => item.currency === currency))
        setCurrencySettings(gameSettings.supported_currencies.find(item => item.currency === currency))
    }, [gameSettings, currency])

    useEffect(() => {
        console.log('NEW CURRENCY SETTINGS: ', currencySettings)
        if (!currencySettings) return
        setBetAmount(+currencySettings.default_bet)
    }, [currencySettings]);

    // currentBet =

    const currentBet = diceUserBet || hiloUserBet

    const handleBetButton = async () => {
        switch (game) {
            case 'dice':
                set
                const diceResult = await createBet({
                    game,
                    session_id: currentSession?.id,
                    body: {
                        amount: betAmount,
                        data: {
                            comparison: isRollOver ? 'gte' : 'lte',
                            choice: rollProgress,
                        },
                    },
                })

                setDiceBet(diceResult.bet)

                break
            case 'hilo':
                const hiloResult = await createBet({
                    game,
                    session_id: currentSession?.id,
                    body: {
                        amount: betAmount,
                        data: {
                            comparison: choice,
                        },
                    },
                })

                setHiloUserBet(hiloResult.bet)

                break
        }
    }

    const handleCancelBet = async () => {
        await cancelBet({ 
            game, 
            session_id: currentSession?.id,
            bet_id: currentBet?.id
        })

        setHiloUserBet(null)
        setDiceBet(null)
    }

    const setBet = (value) => {
        if (currencySettings) {
            console.log(+currencySettings.min_bet)
            console.log(Math.min(value, +currencySettings.max_bet))
            console.log(Math.max(Math.min(value, +currencySettings.max_bet), +currencySettings.min_bet))
            setBetAmount(Math.max(Math.min(value, +currencySettings.max_bet), +currencySettings.min_bet))
        } else {
            setBetAmount(value)
        }
    }

    const divideBet = () => {
        setBet(betAmount / 2)
    }
    const doubleBet = () => {
        setBet(betAmount * 2)
    }
    const maxBet = () => {
        setBet(balance)
    }

    return (
        <div className={'flex-1 max-h-fit'}>
            <StatusAlert/>
            <div className={'my-block flex flex-col xl:h-full'}>
                <div className={'flex flex-1 flex-col rounded-b-none px-2.5 py-4 xl:px-4 xl:pt-5'}>
                    <h3 className={'text-font hidden text-center text-3xl font-semibold capitalize xl:block'}>
                        {game}
                    </h3>
                    <div className={'mt-3 flex flex-col gap-2.5'}>
                        <BetSettingsAmount
                            setBet={setBet}
                            divideBet={divideBet}
                            doubleBet={doubleBet}
                            maxBet={maxBet}
                            betAmount={betAmount}
                            disabled={currentBet || isBetsDisabled || betIsLoading || cancelIsLoading}
                        />

                        {game !== 'hilo' && <BetSettingsRounds />}
                    </div>
                    {currentBet ? (
                        <BetButton
                            onClick={handleCancelBet}
                            betPlaced={currentBet}
                            disabled={isBetsDisabled || betIsLoading || cancelIsLoading}
                        >
                            Cancel the bet
                        </BetButton>
                    ) : (
                        <BetButton
                            onClick={handleBetButton}
                            betPlaced={currentBet}
                            disabled={isBetsDisabled || betIsLoading || cancelIsLoading}
                        >
                            Bet
                        </BetButton>
                    )}
                </div>

                <div
                    className={'hidden items-center justify-between px-4 py-5 xl:flex xl:border-t xl:border-t-white/10'}
                >
                    <div className={'flex items-center gap-4'}>
                        <SoundToggle className={'h-7 w-7 align-bottom'} />

                        <button className={'h-7 w-7 align-bottom'}>
                            <img className={'h-full w-full object-contain'} src="/img/info.svg" alt="" />
                        </button>
                    </div>
                    <div className={'flex items-center gap-1'}>
                        <p className={'text-[0.625rem] leading-none text-gray'}>
                            Provably fair <b className={'text-white'}>protected</b>
                        </p>
                        <div className={'h-7 w-7 align-bottom'}>
                            <img className={'h-full w-full object-contain'} src="/img/protected.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={'mt-3 block w-full xl:hidden'}>
                <div className={'flex items-center justify-center gap-x-4'}>
                    {game !== 'dice' && (
                        <button className={'icon-btn'} onClick={openChat}>
                            <img className={'h-full w-full object-contain'} src="/img/chat.svg" alt="" />
                        </button>
                    )}
                    <SoundToggle className={'icon-btn'} />
                    <button className={'icon-btn'}>
                        <img className={'h-full w-full object-contain'} src="/img/info.svg" alt="" />
                    </button>
                    <button className={'icon-btn'}>
                        <img className={'h-full w-full object-contain'} src="/img/protected.svg" alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}
