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
    let result, err
    let contentId = req.params.contentId
    try {
        [err, result] = await to(eventContentService.deleteEventContent(contentId))
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
    let result, err
    let contentId = req.body.contentId;
    let eventId = req.body.eventId;
    let userId = req.body.userId
    try {
        [err, result] = await to(eventContentService.postDraftEventContent(contentId,eventId,userId))
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
    let result, err
    let userId = req.params.userId;
    try {
        [err, result] = await to(eventContentService.userDfratEventContent(userId))
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
    let result, err
    let userId = req.params.userId;
    try {
        [err, result] = await to(eventContentService.userPostedEventContent(userId))
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
    let result, err
    let eventId= req.params.eventId
    try {
        [err, result] = await to(eventContentService.eventContentList(eventId))
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
    let result, data,err
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
    let result, data,err
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

const eventContentDetails = async (req, res) => {
    let result,err
    let userId  = req.body.userId;
    let contentId = req.body.contentId
    try {
        [err, result] = await to(eventContentService.eventContentDetails(userId,contentId))
        if (err) {
            throw badRequestError(err.message)
        }
        return okResponse(res, {
            result
        }, "event content details ....");
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
    eventContentAction,
    eventContentDetails
}