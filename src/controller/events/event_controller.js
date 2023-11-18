const eventService = require("../../service/events/event_service")

//********this is for creating new events**********
const createEvent = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(eventService.createEvent(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "event is created successfully.");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

//**************posting draft event************ */

const postDraftevent = async (req, res) => {
    let result, err
    let eventId= req.body.eventId;
    let userId = req.body.userId
    try {
        [err, result] = await to(eventService.postDraftevent(eventId,userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your draft event is posted successfully.");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const draftEventListByUserId = async (req, res) => {
    let result, err
    let userId  = req.params.userId
    try {
        [err, result] = await to(eventService.draftEventListByUserId(userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your draft event list ....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const postedEventListByUserId = async (req, res) => {
    let result, err
    let userId = req.params.userId;
    try {
        [err, result] = await to(eventService.postedEventListByUserId(userId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your posted event list.. ");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}


const AllPostedeventList = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(eventService.AllPostedeventList(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "All posted event list fetch successfully.");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

module.exports = {
    createEvent,
    postDraftevent,
    draftEventListByUserId,
    postedEventListByUserId,
    AllPostedeventList
}