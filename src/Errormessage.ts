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

    minimumWithdrawal: {
        success: false,
        apiErrorCode: '403',
        errorMessage: "Minimum withdrawal can't be less than 1naira'"
    },

    transferrableAmount: {
        success: false,
        apiErrorCode: '403',
        errorMessage: 'Maximum transfer is 1,000,000 and minimum transfer is 100'
    },

    unknownUser: {
        success: false,
        apiErrorCode: '403',
        errorMessage: 'No user is associated with such account number'
    },

    noTransaction: {
        success: false,
        apiErrorCode: '403',
        errorMessage: "Transaction haven't occurred on your account yet"
    },

}
