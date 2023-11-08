const eventContentModel = require("../../models/events/event_content")
const eventContentActionModel = require("../../models/events/event_content_action")
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
const postDraftEventContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().update({ "status": true })
            .where({ "userId": data.userId }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//*************Deleting event content *********** */
const deleteEventContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().update({ "delete": true })
            .where({ "eventContentId": data.eventContentId }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//*************All event List ******* */
const eventContentList = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().select("*")
            .eager('[content_owner]')
            .modifyEager('content_owner', (builder) => builder.select("userId", "firstName", "lastName", "middleName", "email"))
            .where({ "eventId": data.eventId })
            .where({ "status": true })
            .where({ "delete": false }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

//**********user draft event content ************ */
const userDfratEventContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().select("*")
            .where({ "userId": data.userId })
            .where({ "eventId": data.eventId })
            .where({ "status": false })
            .where({ "delete": false }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

//*********user event posted content ************ */
const userPostedEventContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().select("*")
            .where({ "userId": data.userId })
            .where({ "eventId": data.eventId })
            .where({ "status": true })
            .where({ "delete": false }))
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
        const finalValue = Number(parseFloat(((data.rating * data.userCount) + (last - current)) / data.userCount).toFixed(2))
        // ***********event content rating seaction *********
        [err, result1] = await to(eventContentModel.query().update({ rating: finalValue, userCount: userCount })
            .where({ "contentId": data.contentId }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        [err, result2] = await to(eventContentActionModel.query().update({ active: false }).where({ "actionId": data.actionId }))
        if (err) {
            throw ErrorResponse(err.message)
        }

        [err, result3] = await to(eventContentActionModel.query().insert(
            {
                userId: data.userId,
                contentId: data.contentId,
                eventId: data.eventId,
                rating: data.current
            }
        ))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result3
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
    eventContentRating
}