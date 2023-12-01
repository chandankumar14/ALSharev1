const transactionService= require("../../service/transaction/transaction_service");
const eventPaymentInitiation = async (req, res) => {
    let result, data,err
    data = req.body
    try {
        [err, result] = await to(transactionService.eventPaymentInitiation(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your transaction is initiated.");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const eventPaymentComplection = async (req, res) => {
    let result, data,err
    data = req.body
    try {
        [err, result] = await to(transactionService.eventPaymentComplection(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "you have joined event successfully.");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const addToWalletInitiation = async (req, res) => {
    let result, data,err
    data = req.body
    try {
        [err, result] = await to(transactionService.addToWalletInitiation(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your transaction is initiated..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const addToWalletPaymentCompletion = async (req, res) => {
    let err,result, data
    data = req.body
    try {
        [err, result] = await to(transactionService.addToWalletPaymentCompletion(data));
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "payment is completed successfully..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}


const walletBalance = async (req, res) => {
    let err,result;
    let userId= req.params.userId
    try {
        [err, result] = await to(transactionService.walletBalance(userId));
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your wallet balance is fetch successfully..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const walletTransHistoryList = async (req, res) => {
    let err,result;
    let userId= req.params.userId
    try {
        [err, result] = await to(transactionService.walletTransHistoryList(userId));
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your wallet transaction History list is fetch successfully..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}


const eventBalanceTransHistory = async (req, res) => {
    let err,result;
    let userId= req.params.userId
    try {
        [err, result] = await to(transactionService.eventBalanceTransHistory(userId));
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your event balance transaction History list is fetch successfully..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const eventBalance = async (req, res) => {
    let err,result;
    let userId= req.params.userId
    try {
        [err, result] = await to(transactionService.eventBalance(userId));
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your event balance  is fetch successfully..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const joinEventFromWallet = async (req, res) => {
    let err, result;
    let data = req.body;
    try {
        [err, result] = await to(transactionService.joinEventFromWallet(data));
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your are successfully join the event..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const joinEventFromEventBalance = async (req, res) => {
    let err, result;
    let data = req.body;
    try {
        [err, result] = await to(transactionService.joinEventFromEventBalance(data));
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your are successfully join the event..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const eventChargeThroughWallet = async (req, res) => {
    let err, result;
    let data = req.body;
    try {
        [err, result] = await to(transactionService.eventChargeThroughWallet(data));
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your payment is successfull ..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}
const eventChargeThroughEventBalance = async (req, res) => {
    let err, result;
    let data = req.body;
    try {
        [err, result] = await to(transactionService.eventChargeThroughEventBalance(data));
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your  payment is  successfull ..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}
const eventChargeThroughOthers = async (req, res) => {
    let err, result;
    let data = req.body;
    try {
        [err, result] = await to(transactionService.eventChargeThroughOthers(data));
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "your payment is  successfull ..");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}


module.exports ={
    eventPaymentInitiation ,
    eventPaymentComplection,
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
    eventChargeThroughOthers
}