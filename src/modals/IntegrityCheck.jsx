import { clsx } from 'clsx'
import { useEffect, useState } from 'preact/hooks'
import { ModalWrapper } from '../components/ModalWrapper'
import { LabelCopyField } from '../components/UI/LabelCopyField'
import { LabelField } from '../components/UI/LabelField'
import { Input } from '../components/UI/Input'
import { Button } from '../components/UI/Button'

import { useModalsStore } from '../lib/modalsStore'

export const IntegrityCheck = ({ modalId }) => {
    const { closeModal, modalData } = useModalsStore();
    const [verificationInput, setVerificationInput] = useState('')
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)


    useEffect(() => {
        if (verificationInput.trim() !== '') {
            setIsSubmitDisabled(false)
        } else {
            setIsSubmitDisabled(true)
        }
    }, [verificationInput])

    const onSubmit = (e) => {
        e.preventDefault()

        if (!isSubmitDisabled) {
            console.log(verificationInput)
            setVerificationInput('')
        }
    }

    const handleCloseModal = () => {
        closeModal(modalId)
    }

    return (
        <ModalWrapper
            modalId={modalId}
            className={'w-full max-w-[48.5rem] rounded-xl border-2 border-dark-650 bg-dark-650'}
        >
            <div className={'flex justify-between bg-dark-gray-400/5 px-4 py-3.5'}>
                <h3 className={'text-xl font-semibold'}>Integrity Check</h3>
                <button
                    onClick={handleCloseModal}
                    className={clsx(
                        'flex size-7 items-center justify-center',
                        'rounded-lg border border-gray-secondary/5 bg-gray-secondary/15',
                    )}
                >
                    <img className={'size-4 select-none object-contain'} src="/img/close.svg" alt="" />
                </button>
            </div>

            <div className={'flex flex-col gap-y-3 p-3'}>
                <div className={'p-3'}>
                    <h3 className={'text-base font-semibold'}>Round Information</h3>

                    <div className={'mt-4 flex gap-2'}>
                        <div className={'w-[13.5rem]'}>
                            <LabelCopyField label={'Round information'}>{modalData.id}</LabelCopyField>
                        </div>
                    </div>

                    <div className={'mt-4 flex flex-col gap-2'}>
                        <LabelCopyField label={'Salt'}>{modalData.salt}</LabelCopyField>
                        <LabelCopyField label={'Hash'}>{modalData.hash}</LabelCopyField>
                    </div>

                    <p className={'mt-2 text-sm font-normal text-gray-secondary'}>
                        You can check for honesty by copying the Salt round to a verification service that will generate
                        an the original Hash based on it.
                    </p>
                </div>

                {/*<div className={'p-3'}>*/}
                {/*    <h3 className={'text-base font-semibold'}>Verification service</h3>*/}

                {/*    <form className={'mt-2 flex w-full gap-2'} onSubmit={onSubmit}>*/}
                {/*        <Input*/}
                {/*            className={'w-full rounded-lg'}*/}
                {/*            placeholder={'Salt'}*/}
                {/*            value={verificationInput}*/}
                {/*            onChange={(e) => setVerificationInput(e.target.value)}*/}
                {/*        />*/}
                {/*        <Button className={'rounded-lg'} disabled={isSubmitDisabled}>*/}
                {/*            Check*/}
                {/*        </Button>*/}
                {/*    </form>*/}
                {/*</div>*/}

                <div className={'p-3'}>
                    <h3 className={'text-base font-semibold'}>Read more about Provably Fair</h3>

                    <p className={'mt-2 text-sm font-normal text-gray-secondary'}>
                        We play fair. You want to know how it works?
                    </p>
                    <ul className={'py-2 pl-5'}>
                        <li className={'py-px text-sm font-normal text-gray-secondary'}>
                            Each round of the game randomly generates a new card, which is stored as a card
                            value.
                        </li>
                        <li className={'py-px text-sm font-normal text-gray-secondary'}>
                            This value is generated on the game servers at the beginning of the round and is openly
                            shown as a encrypted Hash.
                        </li>
                        <li className={'py-px text-sm font-normal text-gray-secondary'}>
                            At the end of the round, the same Hash will be saved in history along with Salt.
                        </li>
                        <li className={'py-px text-sm font-normal text-gray-secondary'}>
                            To view the cipher, click on the shield icon in your betting history or leaderboard.
                        </li>
                    </ul>
                    <p className={'mt-2 text-sm font-normal text-gray-secondary'}>
                        You can check if the hashing is correct in the Integrity Checker or any online window
                    </p>
                </div>
            </div>
        </ModalWrapper>
    )
}
