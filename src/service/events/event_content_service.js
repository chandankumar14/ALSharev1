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

const postDraftEventContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.postDraftEventContent(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const deleteEventContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.deleteEventContent(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const userDfratEventContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.userDfratEventContent(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}

const userPostedEventContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.userPostedEventContent(data))
        if (!result && result == undefined) {
            throw ErrorResponse(err.message)
        }
        return result
    }
    catch (err) {
        throw ErrorResponse(err.message)
    }
}


const eventContentList = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentRepository.eventContentList(data))
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
    eventContentList
}