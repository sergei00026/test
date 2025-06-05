import React from 'react'
import { LiveCounter } from './LiveCounter'
import {useUserStore} from "../lib/userStore.js";

export const ResponseTop = () => {
    const {balance} = useUserStore()
    return (
        <div className={'block xl:hidden'}>
            <div className={'my-block flex items-center justify-between px-2.5 py-3'}>
                <div className={'text-font-muted text-sm font-semibold'}>
                    <h3 className={'mr-2.5 inline-block'}>Balance</h3>
                    <p className={'balance'}>{balance}</p>
                </div>
                <LiveCounter absolute={false} />
            </div>
        </div>
    )
}
