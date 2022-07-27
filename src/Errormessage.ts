export const Errormessage = {

    InsufficientDeposit: {
        success: false,
        apiErrorCode: '403',
        errorMessage: 'Initial deposit must be greater than #500'
    },

    UserExist: {
        success: false,
        apiErrorCode: '403',
        errorMessage: 'User already exist'
    },

    IncorrectData: {
        success: false,
        apiErrorCode: '401',
        errorMessage: 'Account name or password incorrect'
    },

    InvalidToken: {
        success: false,
        apiErrorCode: '401',
        errorMessage: 'User not authorised to perform this operation'
    },

    InsufficientBalance: {
        success: false,
        apiErrorCode: '403',
        errorMessage: "Available balance can't be less than 500"
    },
}