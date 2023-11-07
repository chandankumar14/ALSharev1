const eventRepository = require("../../repository/events/event_repository")
// ******** creating new Event here**********
const createEvent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.createEvent(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}
// ********** posting draft event here ************
const postDraftevent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.postDraftevent(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}
//************ user's draft event list here ********** */
const draftEventListByUserId = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.draftEventListByUserId(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

//****** user's posted evented list here ********** */
const postedEventListByUserId = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.postedEventListByUserId(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}
//**************** All posted evented list here ************ */
const AllPostedeventList = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.AllPostedeventList(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
    }
    catch (err) {
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