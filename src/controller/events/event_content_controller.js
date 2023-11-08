const eventContentService = require("../../service/events/event_content_service")

const postEventContent = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(eventContentService.postEventContent(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your content is posted successfully.");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const deleteEventContent = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(eventContentService.deleteEventContent(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your content is deleted successfully.");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const postDraftEventContent = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(eventContentService.postDraftEventContent(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your draft content is posted successfully.");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}


const userDfratEventContent = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(eventContentService.userDfratEventContent(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your draft content list....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const userPostedEventContent = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(eventContentService.userPostedEventContent(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your posted content list....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const eventContentList = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(eventContentService.eventContentList(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your posted content list....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const eventContentRating = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(eventContentService.eventContentRating(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your rating is saved ....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

const eventContentAction = async (req, res) => {
    let result, data
    data = req.body
    try {
        [err, result] = await to(eventContentService.eventContentAction(data))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "Your reaction is saved ....");
    }
    catch (err) {
        throw badRequestError(err.message)
    }
}

module.exports = {
    postEventContent,
    deleteEventContent,
    postDraftEventContent,
    userDfratEventContent,
    userPostedEventContent,
    eventContentList,
    eventContentRating,
    eventContentAction
}