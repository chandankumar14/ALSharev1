const transactionModel = require("../../models/transaction/transaction");
const participants = require("../../models/events/participants");
const ALPayModel  = require("../../models/alPay/al_pay")
const moment = require("moment")
const path = require("path")
const razorPay = require("razorpay");
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpaySecretKey = process.env.RAZORPAY_SECRET_KEY;

// **********Transaction  inititation for Event Joining **********
const eventPaymentInitiation = async (data) => {
    try {
        let err, razorPayOrder, transaction_history
        var razorPayInstance = new razorPay({
            key_id: razorpayKeyId,
            key_secret: razorpaySecretKey
        })
        var payload1 = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: data.email,
            notes: {
                eventId: data.eventId,
                userId: data.userId,
                message: "creating order Id for joining the event"
            }
        }
        // ************creating order for payment ************
        [err, razorPayOrder] = await to(razorPayInstance.orders.create(payload1));
        if (err) {
            throw ErrorResponse(err.message)
        }
        // **********updating transaction_history_table **************
        const payload = {
            userId: data.userId,
            eventId: data.eventId,
            amount: data.amount,
            orderId: razorPayOrder.id,
            currency_code: 'INR',
            initiated: true,
            keyId: razorpayKeyId
        }
        [err, transaction_history] = await to(transactionModel.query().insert(payload))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return transaction_history
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

//**************updating payment success or failed result ************/
const eventPaymentComplection = async (data) => {
    try {
        const Today_Date = moment().format();
        let err, result1, result2
        //***********updating transaction table ********** */
        const transPayload = {
            transId: data.transId,
            payment_mode: data.payment_mode,
            paymentResponse: data.paymentResponse,
            status:1
        }
        const participantPayload = {
            userId: data.userId,
            eventId: data.eventId,
            joining_date: Today_Date,
            status: 1
        }
        [err, result1] = await to(transactionModel.query().update(transPayload)
            .where({ "orderId": data.orderId }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        //**********updating participants table here ********** */
        [err, result2] = await to(participants.query().insert(participantPayload))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result2
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

// **********Transaction  inititation for adding amount in wallet **********

const addToWalletInitiation = async(data)=>{
    try {
        let err, razorPayOrder, transaction_history
        var razorPayInstance = new razorPay({
            key_id: razorpayKeyId,
            key_secret: razorpaySecretKey
        })
        var payload1 = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: data.email,
            notes: {
                userId: data.userId,
                message: "creating order Id for adding balance in ALPay.."
            }
        }
        // ************creating order for payment ************
        [err, razorPayOrder] = await to(razorPayInstance.orders.create(payload1));
        if (err) {
            throw ErrorResponse(err.message)
        }
        // **********updating transaction_history_table **************
        const payload = {
            userId: data.userId,
            credit_amount: data.amount,
            orderId: razorPayOrder.id,
            currency_code: 'INR',
            initiated: true,
            keyId: razorpayKeyId
        }
        [err, transaction_history] = await to(ALPayModel.query().insert(payload))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return transaction_history
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const addToWalletPaymentCompletion =  async(data)=>{
    try {
       let err, result1
        //***********updating transaction table ********** */
        const transPayload = {
            transId: data.transId,
            payment_mode: data.payment_mode,
            paymentResponse: data.paymentResponse,
            status:1
        }
        [err, result1] = await to(ALPayModel.query().update(transPayload)
            .where({ "orderId": data.orderId }))
        if (err) {
            throw ErrorResponse(err.message)
        }
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

module.exports = {
    eventPaymentInitiation,
    eventPaymentComplection,
    addToWalletInitiation,
    addToWalletPaymentCompletion
}