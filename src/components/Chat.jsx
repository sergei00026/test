import clsx from 'clsx'
import { useEffect, useRef, useState } from 'preact/hooks'
import { useChatStore } from '../lib/chatStore'
import {sendMessage} from "../lib/api.js";
import {useConfigStore} from "../lib/configStore.js";
import {useUserStore} from "../lib/userStore.js";


export const Chat = () => {
    const { game } = useConfigStore()
    const {token, userId} = useUserStore()
    const chatOuterRef = useRef(null)
    const chatInnerRef = useRef(null)

    const { isChatOpen, closeChat, messages } = useChatStore()

    const [chatInnerStyles, setChatInnerStyles] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if ((chatOuterRef.current, chatInnerRef.current)) {
            setChatInnerStyles({
                width: `calc(100% + ${chatOuterRef.current.offsetWidth - chatInnerRef.current.offsetWidth}px)`,
            })
        }
    }, [chatOuterRef, chatInnerRef])

    useEffect(() => {
        chatOuterRef.current.scrollTop = chatOuterRef.current.scrollHeight
    }, [messages])

    const onSubmit = (event) => {
        event.preventDefault()
        if (isLoading || !message) return
        setIsLoading(true)
        sendMessage(game, message, token).then(() => {
            setMessage('')
        }).finally(() => setIsLoading(false))
    }

    return (
        <div
            className={clsx(
                'fixed bottom-0 left-0 z-50 w-full transition-[visibility] duration-300 xl:static',
                isChatOpen ? 'visible xl:visible' : 'invisible xl:visible',
            )}
        >
            <div
                className={clsx(
                    'px-1 transition-transform duration-300 xl:px-0',
                    isChatOpen ? 'translate-y-0 xl:translate-y-0' : 'translate-y-full xl:translate-y-0',
                )}
            >
                <div className={'my-block h-[38.875rem] w-full'}>
                    <div className={'flex h-full flex-col'}>
                        <div className={'flex w-full items-center justify-between px-3 py-5'}>
                            <h3
                                className={clsx(
                                    'flex items-center text-2xl font-semibold uppercase leading-none',
                                    'before:mr-2 before:block before:h-7 before:w-7',
                                    'before:bg-[url(/img/chat.svg)] before:bg-contain before:bg-center before:bg-no-repeat',
                                )}
                            >
                                Live Chat
                            </h3>

                            <button className={'block xl:hidden'} onClick={closeChat}>
                                <img src="/img/close_chat.svg" alt="" />
                            </button>
                        </div>

                        <div className={'chat-scrollbar flex-1 overflow-y-auto overflow-x-hidden'} ref={chatOuterRef}>
                            <div
                                className={'flex flex-col gap-1.5 px-3 py-2.5'}
                                ref={chatInnerRef}
                                style={chatInnerStyles}
                            >
                                {messages.map((item, index) => (
                                    <div key={index} className={'w-full rounded-md bg-[#212121] px-3.5 py-1.5'}>
                                        <h4 className={`${item.user_id === userId ? 'text-brand-500' : 'text-gray'}`}>
                                            {item.username}
                                        </h4>
                                        <div className={'flex'}>
                                            <p className={'flex-1 text-sm'}>{item.message}</p>
                                            <span className={'text-sm text-gray'}>{new Date(item.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <form className={'border-t border-t-gray/25'} onSubmit={onSubmit}>
                            <input
                                type="text"
                                className={
                                    'w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-gray'
                                }
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Click here to text"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
