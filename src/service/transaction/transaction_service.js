const transactionRepository = require("../../repository/transaction/transaction_repository")

const eventPaymentInitiation = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.eventPaymentInitiation(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
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
        return result
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
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const addToWalletPaymentCompletion = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.addToWalletPaymentCompletion(data));
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const walletBalance = async (userId) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.walletBalance(userId));
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const walletTransHistoryList = async (userId) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.walletTransHistoryList(userId));
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const eventBalanceTransHistory = async (userId) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.eventBalanceTransHistory(userId));
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const eventBalance = async (userId) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.eventBalance(userId));
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const joinEventFromWallet = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.joinEventFromWallet(data));
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}


const joinEventFromEventBalance = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.joinEventFromEventBalance(data));
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const eventChargeThroughWallet = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.eventChargeThroughWallet(data));
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const eventChargeThroughEventBalance = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.eventChargeThroughEventBalance(data));
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}


const eventChargeThroughOthers = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.eventChargeThroughOthers(data));
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const joinFreeEvent = async (data) => {
    try {
        let err, result
        [err, result] = await to(transactionRepository.joinFreeEvent(data));
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}
module.exports ={
    eventPaymentInitiation,
    eventPaymentComplection ,
    addToWalletInitiation,
    addToWalletPaymentCompletion,
    walletBalance,
    walletTransHistoryList,
    eventBalanceTransHistory,
    eventBalance,
    joinEventFromWallet,
    joinEventFromEventBalance,
    eventChargeThroughWallet,
    eventChargeThroughEventBalance,
    eventChargeThroughOthers,
    joinFreeEvent
}