const eventModel = require("../../models/events/event");
const participantModel = require("../../models/events/participants");
const eventBalanceModel = require("../../models/wallet_feature/event_balance");
const profitCalsModel = require("../../models/events/profit_cals");
const eventContentModel = require("../../models/events/event_content");
const crypto = require('crypto');
const moment = require("moment");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
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
const postDraftevent = async (eventId, userId) => {
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
            .where({ "delete": 0 })
            .where("end_date", ">=", Today_Date)
            .orderBy("created_at", "DESC"))
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
}// **********this is for cron job to update winning prize to winner ***********
const expireEventList = async () => {
    try {
        let err, result, winner, payload = [], participantPayload = [];
        const Today_Date = moment().format();
        //**********Fetching All expire event List details****** */
        [err, result] = await to(eventModel.query()
            .select("eventId", "prize", "Min_Prize")
            .where("end_date", "<", Today_Date)
            .where({ "event_balance_credit_status": 0 })
            .where({ "event_status": 1 })
            .where({ "delete": 0 }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        if (result && result.length > 0) {
            try {
                let eventIdList = [];
                result.map(item => {
                    eventIdList.push(item.eventId);
                });
                // **********this is  manual Awards for winner *************
                if (result && result.length > 0) {
                    result.map(async item => {
                        let prize = JSON.parse(item.prize);
                        let awards = prize.awards;
                        if (item && awards.length > 0) {
                            try {
                                [err, winner] = await to(eventContentModel.query().select("userId", "eventId")
                                    .where({ "eventId": item.eventId })
                                    .orderBy("rating", "DESC")
                                    .limit(awards.length));
                                if (err) {
                                    throw ErrorResponse(err.message);
                                };
                                if (winner && winner.length > 0 && winner != undefined) {
                                    winner.map((item3, index) => {
                                        let payObj = {
                                            userId: item3.userId,
                                            orderId: crypto.randomBytes(16).toString('hex'),
                                            transId: crypto.randomBytes(16).toString('hex'),
                                            credit_amount: awards[index].amount,
                                            payment_mode: "credit_event_balance",
                                            status: 1,
                                            currency_code: "INR"
                                        };
                                        payload.push(payObj);
                                    })
                                };
                                //***********updating minimum prize update here to participants*********** */
                                if (winner && winner.length > 0) {
                                    let winnerId = [];
                                    winner.map(async(item1 => {
                                        winnerId.push(item1.userId);
                                    }))
                                    if (winnerId && winnerId.length > 0) {
                                        try {
                                            let participantId;
                                            [err, participantId] = await to(participantModel.query().select("userId")
                                                .where({ "eventId": item.eventId })
                                                .havingNotIn("userId", winnerId));
                                            if (participantId && participantId != undefined) {
                                                participantId.map(item2 => {
                                                    let payload = {
                                                        userId: item2.userId,
                                                        orderId: crypto.randomBytes(16).toString('hex'),
                                                        transId: crypto.randomBytes(16).toString('hex'),
                                                        credit_amount: item.Min_Prize,
                                                        payment_mode: "credit_event_balance",
                                                        status: 1,
                                                        currency_code: "INR"
                                                    }
                                                    participantPayload.push(payload)
                                                })
                                            }
                                        } catch (err) {
                                            throw ErrorResponse(err.message);
                                        }
                                    }
                                }

                            } catch (err) {
                                throw ErrorResponse(err.message);
                            }
                        }
                    })
                };
                //***********updating winner prize amount here ************** */
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
                };
                //***********updating rest participants  prize amount here ************** */
                if (payload && payload.length > 0) {
                    try {
                        let ressult4;
                        [err, ressult4] = await to(eventBalanceModel.query().insertGraph(participantPayload));
                        if (err) {
                            throw ErrorResponse(err.message);
                        };
                        return ressult4
                    } catch (err) {
                        throw ErrorResponse(err.message)
                    }
                };
            } catch (err) {
                throw ErrorResponse(err.message)
            }
        }
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
// *****this is for event details ************
const eventDetails = async (eventId) => {
    try {
        let err, result;
        const Today_Date = moment().format();
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
            .where({ "delete": 0 })
            .where("end_date", ">=", Today_Date)
            .where({ "eventId": eventId })
        )
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//*************profit calculator API ************* */
const profitCals = async (data) => {
    try {
        let err, result, result2, ressult4;
        let Id = data.Id ? data.Id : 0;
        const profit_percentage = process.env.RETURN_PROFIT_PERCENTAGE;
        const collect_entry_fee = data.Expected_Users * data.entry_fee;
        const min_prize_return_percentage = (data.min_prize / data.entry_fee) * 100;
        const total_min_prize_value = (min_prize_return_percentage / 100) * (data.Expected_Users * data.entry_fee);
        const total_profit = ((collect_entry_fee) - (total_min_prize_value)) * (profit_percentage / 100);
        [err, result] = await to(profitCalsModel.query().select("*")
            .where({ "Id": Id })
            .where({ "status": 0 }));
        if (err) {
            throw ErrorResponse(err.message)
        };
        if (result && result != undefined && result.length > 0) {
            [err, result2] = await to(profitCalsModel.query().update({
                entry_fee: data.entry_fee,
                min_prize: data.min_prize,
                expected_users: data.Expected_Users
            })
                .where({ "Id": Id }));
            if (err) {
                throw ErrorResponse(err.message)
            };
            return {
                userId: data.userId,
                total_entry_fee: collect_entry_fee.toFixed(2),
                profit: total_profit.toFixed(2),
                Expected_Users: data.Expected_Users,
                entry_fee: data.entry_fee,
                min_prize: data.min_prize,
                min_prize_percentage: min_prize_return_percentage.toFixed(2),
                total_min_prize_value: total_min_prize_value.toFixed(2),
                Id: result[0].Id
            };
        } else {
            const payload = {
                userId: data.userId,
                min_prize: data.min_prize,
                expected_users: data.Expected_Users,
                entry_fee: data.entry_fee
            };
            [err, ressult4] = await to(profitCalsModel.query().insert(payload));
            if (err) {
                throw ErrorResponse(err.message)
            };
            return {
                userId: data.userId,
                total_entry_fee: collect_entry_fee.toFixed(2),
                profit: total_profit.toFixed(2),
                Expected_Users: data.Expected_Users,
                entry_fee: data.entry_fee,
                min_prize: data.min_prize,
                min_prize_percentage: min_prize_return_percentage.toFixed(2),
                total_min_prize_value: total_min_prize_value.toFixed(2),
                Id: ressult4.id
            };
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
    expireEventList,
    eventDetails,
    profitCals
}