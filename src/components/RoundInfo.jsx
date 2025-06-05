import clsx from 'clsx'
import { useState } from 'preact/hooks'
import { LabelCopyField } from './UI/LabelCopyField'

export const RoundInfo = () => {
    const [openPopup, setOpenPopup] = useState(false)

    return (
        <div className={'absolute right-4 top-4 hidden z-50 xl:block'}>
            <div className={'relative'}>
                <button onClick={() => setOpenPopup(true)}>
                    <img src="/img/info.svg" alt="" />
                </button>

                <div
                    className={clsx(
                        'absolute -right-2.5 top-full',
                        'transition-[transform,visibility,opacity] duration-300',
                        openPopup ? 'opacity-1 visible translate-y-0' : 'invisible -translate-y-1 opacity-0',
                    )}
                >
                    <div className={'w-[20rem] rounded-xl bg-dark-800 p-2.5'}>
                        <div className={'flex items-center justify-between'}>
                            <h3 className={'text-xl font-semibold'}>Round information</h3>

                            <button className={'h-7 w-7'} onClick={() => setOpenPopup(false)}>
                                <img src="/img/close.svg" alt="" />
                            </button>
                        </div>

                        <div className={'mt-2.5 flex justify-between'}>
                            <div className={'flex gap-2'}>
                                <LabelCopyField label={'round ID'} className={'w-[8.125rem]'}>
                                    #bcastgswqqw214
                                </LabelCopyField>
                                <LabelCopyField label={'Multiplier'} className={'w-[7rem]'}>
                                    ?
                                </LabelCopyField>
                            </div>

                            <button className={'h-9 w-9 rounded-lg border border-dark-500 bg-dark-700 p-1.5'}>
                                <img
                                    src="/img/protected.svg"
                                    className={'h-full w-full object-contain opacity-30'}
                                    alt=""
                                />
                            </button>
                        </div>

                        <div className={'mt-2 flex flex-col gap-2'}>
                            <LabelCopyField label={'Salt'} className={'w-full'}>
                                Round not completed
                            </LabelCopyField>
                            <LabelCopyField label={'Hash'} className={'w-full'}>
                                767b3b6f82aaeea8c9d8c1rsdapowrf
                            </LabelCopyField>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
