const eventModel = require("../../models/events/event");
const participantModel = require("../../models/events/participants");
const eventBalanceModel = require("../../models/wallet_feature/event_balance")
const crypto = require('crypto');
const moment = require("moment")
// ********creating event here********
const createEvent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventModel.query().insert(data));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

//*************posting draft event ********* */
const postDraftevent = async (eventId,userId) => {
    try {
        let err, result
        [err, result] = await to(eventModel.query().update({ "event_status": 1 })
            .where({ "eventId": eventId })
            .where({ "userId": userId }));

        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
// *********** Fetching All Draft event of User ************
const draftEventListByUserId = async (userId) => {
    try {
        let err, result
        [err, result] = await to(eventModel.query().select("*")
            .where({ "userId": userId })
            .where({ "event_status": 0 })
            .where({ "delete": 0 }))

        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//********** Posted event List of user  */
const postedEventListByUserId = async (userId) => {
    try {
        const Today_Date = moment().format();
        let err, result
        [err, result] = await to(eventModel.query().select("*")
            .withGraphFetched('[participant]')
            .modifyGraph("participant", (builder) =>
                builder.join("users", "users.userId", "participants.userId")
                    .select("participants.userId", "participants.eventId",
                        "participants.joining_date", "participants.status",
                        "firstName", "profileImage")
                    .where({ "status": 1 }))
            .where({ "userId": userId })
            .where({ "event_status": 1 })
            .where("end_date", ">=", Today_Date))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
// Fetching All posted event List here *************
const AllPostedeventList = async (data) => {
    try {
        const Today_Date = moment().format();
        let err, result
        [err, result] = await to(eventModel.query().select("*")
            .withGraphFetched('[event_owner,participant]')
            .modifyGraph('event_owner', (builder) =>
                builder.select("firstName", "lastName", "middleName", "email", "profileImage"))
            .modifyGraph("participant", (builder) =>
                builder.join("users", "users.userId", "participants.userId")
                    .select("participants.userId", "participants.eventId",
                        "participants.joining_date", "participants.status",
                        "firstName", "lastName", "middleName", "email", "profileImage")
                    .where({ "status": 1 }))
            .where({ "event_status": 1 })
            .where("end_date", ">=", Today_Date)
            .orderBy("created_at","DESC"))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
// delete draft event **********

const deleteDraftevent = async (userId, eventId) => {
    try {
        let err, result;
        [err, result] = await to(eventModel.query().update({ delete: 1 })
            .where({ "userId": userId })
            .where({ "eventId": eventId }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const expireEventList = async () => {
    try {
        let err, result, payload = [];
        const Today_Date = moment().format();
        //**********Fetching All expire event List details****** */
        [err, result] = await to(eventModel.query()
            .select("eventId", "entry_fee")
            .where("end_date", "<", Today_Date)
            .where({ "event_balance_credit_status": 0 })
            .where({ "event_status": 1 })
            .where({ "delete": 0 }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        if (result && result.length > 0) {
            try {
                let result2, eventIdList = [];
                result.map(item => {
                    eventIdList.push(item.eventId);
                })
                if (eventIdList && eventIdList.length > 0) {
                    //*********participants list details ********* */
                    [err, result2] = await to(participantModel.query()
                        .select("userId", "eventId")
                        .havingIn("eventId", eventIdList)
                        .where({ "status": 1 }))
                };
                if (err) {
                    throw ErrorResponse(err.message)
                };
                if (result2 && result2.length > 0) {
                    result2.map(item1 => {
                        let response = result.filter(item2 => item2.eventId === item1.eventId);
                        let payObj = {
                            userId: item1.userId,
                            orderId: crypto.randomBytes(16).toString('hex'),
                            transId: crypto.randomBytes(16).toString('hex'),
                            credit_amount: response[0].entry_fee,
                            payment_mode: "credit_event_balance",
                            status: 1,
                            currency_code: "INR"
                        };
                        payload.push(payObj);
                    })
                };
                if (payload && payload.length > 0) {
                    try {
                        let ressult4;
                        [err, ressult4] = await to(eventBalanceModel.query().insertGraph(payload));
                        if (err) {
                            throw ErrorResponse(err.message);
                        };
                       if (ressult4 && ressult4 != undefined) {
                            try {
                                let result5;
                                [err, result5] = await to(eventModel.query().update({ event_balance_credit_status: 1 })
                                    .whereIn("eventId", eventIdList));
                                if (err) {
                                    throw ErrorResponse(err.message);
                                };
                                return result5
                            } catch (err) {
                                throw ErrorResponse(err.message)
                            }
                        }

                    } catch (err) {
                        throw ErrorResponse(err.message)
                    }
                }

            } catch (err) {
                throw ErrorResponse(err.message)
            }

        }
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}


module.exports = {
    createEvent,
    postDraftevent,
    draftEventListByUserId,
    postedEventListByUserId,
    AllPostedeventList,
    deleteDraftevent,
    expireEventList
}