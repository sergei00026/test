export const errorsMap = {
    bet_cancellation_period_ended: 'Bet cancellation period ended',
    unsupported_currency: 'Unsupported currency',
    bet_amount_too_low: 'Bet amount too low',
    bet_amount_too_high: 'Bet amount too high',
    user_not_found: 'User not found',
    bet_cancellation_forbidden: 'Bet cancellation forbidden',
    session_not_found: 'Session not found',
    bet_not_found: 'Bet not found',
    currency_not_supported: 'Currency not supported',
    bet_already_exists: 'Bet already exist',
    bet_already_canceled: 'Bet already canceled',
    internal_error: 'Internal error',
}

export function getErrorText(error_code) {
    return errorsMap[error_code] || errorsMap.internal_error
}