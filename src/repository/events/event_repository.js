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
const postDraftevent = async (date) => {
    try {
        let err, result
        [err, result] = await to(eventModel.query().update({ "event_status": true })
            .where({ "userId": date.userId }));

        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
// *********** Fetching All Draft event of User ************
const draftEventListByUserId = async (data) => {
    try {
        const Today_Date = moment().format();
        let err, result
        [err, result] = await to(eventModel.query().select("*")
            .where({ "userId": data.userId })
            .where({ "event_status": false })
            .where("end_date", ">=", Today_Date))

        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//********** Posted event List of user  */
const postedEventListByUserId = async (data) => {
    try {
        const Today_Date = moment().format();
        let err, result
        [err, result] = await to(eventModel.query().select("*")
            .where({ "userId": data.userId })
            .where({ "event_status": true })
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
            .eager('[event_owner,participant]')
            .modifyEager('event_owner', (builder) => builder.select("userId", "firstName", "lastName", "middleName", "email"))
            .modifyEager("participant", (builder) => builder.select("userId", "firstName", "lastName", "middleName", "email"))
            .where({ "event_status": true })
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