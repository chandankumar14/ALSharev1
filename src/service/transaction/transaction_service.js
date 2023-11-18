const transactionRepository = require("../../repository/transaction/transaction_repository")

const eventPaymentInitiation = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.eventPaymentInitiation(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const eventPaymentComplection = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.eventPaymentComplection(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const addToWalletInitiation = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.addToWalletInitiation(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const addToWalletPaymentCompletion = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.addToWalletPaymentCompletion(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

module.exports ={
    eventPaymentInitiation,
    eventPaymentComplection ,
    addToWalletInitiation,
    addToWalletPaymentCompletion
}