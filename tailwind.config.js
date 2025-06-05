/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xl: '1155px',
            lg: '682px',

            'hilo-xl': '1316px',
            'hilo-lg': '792px'
        },
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
                poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                'hilo-countdown-text': 'clamp(3rem, 15vw, 6rem)'
            },
            maxWidth: {
                app: '1346px',
            },
            borderWidth: {
                'slider-triangle': '0 8px 12px 8px',
            },
            boxShadow: {
                'hilo-bg':
                    '0 0 435px rgba(196, 196, 253, 0.1), 0 0 476px rgba(196, 196, 253, 0.16), 0 0 202px rgba(196, 196, 253, 0.08), 0 0 0 rgba(196, 196, 253, 0.05)',
                'hilo-notification-success':
                    '0 0 394px rgba(196, 196, 253, 0.4), 0 0 258px rgba(196, 196, 253, 0.2), 0 0 173px rgba(196, 196, 253, 0.1), 0 0 123px rgba(196, 196, 253, 0.06), 0 0 89px rgba(196, 196, 253, 0.06), 0 0 53px rgba(196, 196, 253, 0.05)',
                'hilo-notification-declined':
                    '0 0 258px rgba(254, 124, 140, 0.2), 0 0 173px rgba(254, 124, 140, 0.1), 0 0 123px rgba(254, 124, 140, 0.06), 0 0 89px rgba(254, 124, 140, 0.06), 0 0 394px rgba(254, 124, 140, 0.4), 0 0 53px rgba(254, 124, 140, 0.05)',
            },
            colors: {
                brand: {
                    500: '#80FF80',
                    600: '#66FF66',
                    700: '#4DFF4D',
                    800: '#33FF33',
                    900: '#00E701',
                    secondary: '#2F4553',
                },
                'dark-gray': {
                    400: '#818794',
                    500: '#343440',
                    600: '#2D2D3A',
                    700: '#262631',
                    800: '#21212C',
                    900: '#15151F',
                },
                dark: {
                    200: '#606060',
                    400: '#191919',
                    500: '#212121',
                    600: '#27272B',
                    650: '#141415',
                    700: '#17171B',
                    750: '#1D1D1F',
                    800: '#121215',
                    900: '#040406',
                },
                success: '#7CFEB8',
                alert: '#FE7C8C',
                dice: {
                    history: {
                        win: '#0F212E',
                        lose: '#B1BAD3',
                    },
                    game: {
                        win: '#00CF17',
                        lose: '#E9113C',
                    },
                },
                white: '#FFFFFF',
                gray: '#858585',
                'gray-secondary': '#9AA1B1',
                block: '#161616',
                'btn-stoke': '#006900',
                'btn-stoke-alert': '#FF0000',
                'history-table': {
                    header: '#888888',
                    ceil: {
                        font: '#686868',
                        even: '#1B1B1B',
                        odd: '#141415',
                    },
                },
                'hilo-purple': '#7F7FFA',
                'modal-overlay': '#000000',
                keno: {
                    tile: {
                        selected: {
                            DEFAULT: '#01BD56',
                            secondary: '#0E552E',
                        },
                        wrong: {
                            DEFAULT: '#CF202E',
                            secondary: '#4E0006'
                        }
                    },
                },
            },
            backgroundImage: {
                '500-gradient': 'linear-gradient(180deg, #059759 0%, #52F86A 100%)',
                '500-gradient-alert': 'linear-gradient(180deg, #840101 0%, #FF0C0C 100%)',
                '700-gradient-stroke':
                    'linear-gradient(139deg, rgba(31,255,32,1) 0%, rgba(30,30,30,0) 67%, rgba(31,255,32,1) 100%)',
                'game-controller-gradient':
                    'linear-gradient(180deg, rgba(136,136,136,0.01) 0%, rgba(34,34,34,1) 44%, rgba(136,136,136,0.01) 100%)',
                'hilo-gradient': 'linear-gradient(180deg, rgba(127,127,250,0) 52%, rgba(174,174,255,0.12) 100%)',
                'hilo-game':
                    'linear-gradient(145deg, rgba(40,40,49,0.5) 0%, rgba(0,0,0,0.12) 15%, rgba(0,0,0,0.12) 85%, rgba(40,40,49,0.5) 100%)',
            },
        },
    },
    plugins: [],
}
