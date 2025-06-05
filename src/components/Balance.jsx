import {useUserStore} from "../lib/userStore.js";

export const Balance = () => {
    const {balance} = useUserStore()
    return (
        <div className={'my-block px-3.5 py-2.5'}>
            <div className={'text-font-muted text-sm font-semibold'}>
                <h3 className={'inline-block mr-2.5'}>Balance</h3>
                <p className={'balance'}>{balance}</p>
            </div>
        </div>
    )
}
