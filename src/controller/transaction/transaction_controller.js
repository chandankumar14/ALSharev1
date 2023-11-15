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

module.exports ={
    eventPaymentInitiation ,
    eventPaymentComplection
}