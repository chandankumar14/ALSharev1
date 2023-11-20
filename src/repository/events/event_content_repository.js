const eventContentModel = require("../../models/events/event_content")
const eventContentActionModel = require("../../models/events/event_content_action")
const eventContentRatingModel = require("../../models/events/event_content_rating")
//posting this event content 
const postEventContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().insert(data))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//*********Post draft event content ********* */
const postDraftEventContent = async (contentId, eventId, userId) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().update({ "status": 1 })
            .where({ "contentId": contentId })
            .where({ "eventId": eventId })
            .where({ "userId": userId }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//*************Deleting event content *********** */
const deleteEventContent = async (contentId) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().update({ "delete": 1 })
            .where({ "contentId": contentId }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//*************All event List ******* */
const eventContentList = async (eventId) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().select("*")
            .withGraphFetched('[action,rating]')
            .modifyGraph('action', (builder) => builder.select("*")
                .where({ "active": 1 }))
            .modifyGraph("rating", (builder) => builder.select("*")
                .where({ "active": 1 }))
            .where({ "eventId": eventId })
            .where({ "status": 1 })
            .where({ "delete": 0 }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

//**********user draft event content ************ */
const userDfratEventContent = async (userId) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().select("*")
            .where({ "userId": userId })
            .where({ "status": 0 })
            .where({ "delete": 0 }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

//*********user event posted content ************ */
const userPostedEventContent = async (userId) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().select("*")
            .where({ "userId": userId })
            .where({ "status": 1 })
            .where({ "delete": 0 }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const eventContentRating = async (data) => {
    try {
        let err, result1, result2, result3
        const payload = {
            contentId: data.contentId,
            rating: data.current,
            userId: data.userId,
            active: 1
        }
        const finalValue = Number(parseFloat(((data.rating * data.userCount) + (data.last - data.current)) / data.userCount).toFixed(2))
        // ***********event content rating seaction *********
        [err, result1] = await to(eventContentModel.query()
            .update({ rating: finalValue, userCount: userCount })
            .where({ "contentId": data.contentId }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        if (result1 && result1 != undefined) {
            try {
                if (data.firstTime) {
                    [err, result2] = await to(eventContentRatingModel.query().insert(payload))
                    if (err) {
                        throw ErrorResponse(err.message)
                    }
                    return result2
                } else {
                    [err, result2] = await to(eventContentRatingModel.query()
                        .update({ active: 0 })
                        .where({ "actionId": data.actionId }))
                    if (err) {
                        throw ErrorResponse(err.message)
                    }
                    if (result2 && result2 != undefined) {
                        try {
                            [err, result3] = await to(eventContentRatingModel.query().insert(payload));
                            if (err) {
                                throw ErrorResponse(err.message)
                            }
                            return result3
                        } catch (err) {
                            throw ErrorResponse(err.message)
                        }
                    }
                }

            } catch (err) {
                throw ErrorResponse(err.message)
            }
        }
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
const eventContentAction = async (data) => {
    try {
        let err, result2, result3
        const payload = {
            userId: data.userId,
            contentId: data.contentId,
            eventId: data.eventId,
            typeId: data.typeId,
            name: data.name,
            value: data.value,
        }
        if (data.firstTime) {
            [err, result2] = await to(eventContentActionModel.query().insert(payload))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result2
        } else {
            [err, result2] = await to(eventContentActionModel.query()
                .update({ active: 0 })
                .where({ "actionId": data.actionId }))
            if (err) {
                throw ErrorResponse(err.message)
            }
            if (result2 && result2 != undefined) {
                try {
                    [err, result3] = await to(eventContentActionModel.query().insert(payload))
                    if (err) {
                        throw ErrorResponse(err.message)
                    }
                    return result3
                } catch (err) {
                    throw ErrorResponse(err.message)
                }
            }
        }

    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
module.exports = {
    postEventContent,
    postDraftEventContent,
    deleteEventContent,
    eventContentList,
    userDfratEventContent,
    userPostedEventContent,
    eventContentRating,
    eventContentAction
}