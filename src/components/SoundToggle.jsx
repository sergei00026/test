import { memo } from 'preact/compat'
import { useConfigStore } from '../lib/configStore'

export const SoundToggle = ({ className = 'h-7 w-7 align-bottom' }) => {
    const { muted, toggleMuteState } = useConfigStore()

    return (
        <button className={className} onClick={toggleMuteState}>
            {muted ? <SoundOffIcon /> : <SoundOnIcon />}
        </button>
    )
}

const SoundOnIcon = memo(() => {
    return (
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.3029 22.5146L19.5476 21.1104C23.4601 16.8349 23.4601 10.299 19.5476 6.02353L21.3028 4.61934C25.8703 9.7194 25.8702 17.4146 21.3029 22.5146ZM16.8528 8.17939L15.0955 9.58522C17.1941 11.83 17.194 15.3039 15.0956 17.5487L16.8529 18.9546C19.6059 15.8843 19.6059 11.2496 16.8528 8.17939ZM12.3618 4.5L6.51599 9.09998H2.25V18.1H6.52258L12.3618 22.6066V4.5Z"
                fill="white"
            />
        </svg>
    )
})

const SoundOffIcon = memo(() => {
    return (
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.733 3.15002L18.0001 16.4171L18.2866 16.7036L20.8955 19.3125C20.8955 19.3125 20.8955 19.3125 20.8955 19.3125L22.523 20.9399L22.5229 20.9399L23.858 22.275L22.267 23.866L12.3618 13.9607L12.3618 22.6146L6.52258 18.108H2.25V9.108H6.51599L7.07166 8.67068L3.142 4.74101L4.733 3.15002ZM21.3028 4.62736C24.875 8.61614 25.6534 14.1923 23.6379 18.8728L21.9003 17.1352C23.1591 13.3909 22.3748 9.12106 19.5476 6.03155L21.3028 4.62736ZM16.8528 8.18741C18.3624 9.87093 19.0443 12.0249 18.8983 14.1333L16.3018 11.5369C16.0475 10.8559 15.6612 10.2122 15.143 9.6446L15.0955 9.59324L16.8528 8.18741ZM12.3618 4.50802L12.3618 7.59688L10.6331 5.86825L12.3618 4.50802Z"
                fill="white"
            />
        </svg>
    )
})
