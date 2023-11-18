const eventModel = require("../../models/events/event")
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
            .where({ "event_status": 0 }))

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
            .modifyGraph('event_owner', (builder) => builder.select("*"))
            .modifyGraph("participant", (builder) => builder.select("*").where({"status":1}))
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

module.exports = {
    createEvent,
    postDraftevent,
    draftEventListByUserId,
    postedEventListByUserId,
    AllPostedeventList
}