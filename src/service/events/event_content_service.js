const eventContentRepository = require("../../repository/events/event_content_repository")
const postEventContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.postEventContent(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const postDraftEventContent = async (contentId,eventId,userId) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.postDraftEventContent(contentId,eventId,userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const deleteEventContent = async (contentId) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.deleteEventContent(contentId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const userDfratEventContent = async (userId) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.userDfratEventContent(userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const userPostedEventContent = async (userId) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.userPostedEventContent(userId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}


const eventContentList = async (eventId) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.eventContentList(eventId))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const eventContentRating = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.eventContentRating(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const eventContentAction = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.eventContentAction(data))
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
    postEventContent,
    postDraftEventContent,
    deleteEventContent,
    userDfratEventContent,
    userPostedEventContent,
    eventContentList,
    eventContentRating,
    eventContentAction
}