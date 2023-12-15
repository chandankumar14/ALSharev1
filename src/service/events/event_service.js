const eventRepository = require("../../repository/events/event_repository")
// ******** creating new Event here**********
const createEvent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.createEvent(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}
// ********** posting draft event here ************
const postDraftevent = async (eventId,userId) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.postDraftevent(eventId,userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}
//************ user's draft event list here ********** */
const draftEventListByUserId = async (userId) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.draftEventListByUserId(userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

//****** user's posted evented list here ********** */
const postedEventListByUserId = async (userId) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.postedEventListByUserId(userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
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
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const deleteDraftevent = async (userId, eventId) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.deleteDraftevent(userId, eventId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const eventDetails = async (eventId) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.eventDetails(eventId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}


const profitCals = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventRepository.profitCals(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
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
    AllPostedeventList,
    deleteDraftevent,
    eventDetails,
    profitCals
}