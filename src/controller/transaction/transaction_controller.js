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

module.exports ={
    eventPaymentInitiation ,
    eventPaymentComplection,
    addToWalletInitiation,
    addToWalletPaymentCompletion,
    walletBalance
}