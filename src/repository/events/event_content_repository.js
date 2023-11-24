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
            .withGraphFetched('[action,user_details]')
            .modifyGraph('action', (builder) => builder.select("*")
                .where({ "active": 1 }))
            .modifyGraph("user_details", (builder) => builder.select("userId", "firstName", "profileImage"))
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

const eventContentAction = async (data) => {
    try {
        let err, result2, result3
        const payload = {
            userId: data.userId,
            contentId: data.contentId,
            typeId: data.typeId,
            name: data.name,
            value: data.value,
        };
        [err, result2] = await to(eventContentActionModel
            .query().select("contentId", "userId")
            .where({ "active": 1 })
            .where({ "userId": data.userId })
            .where({ "contentId": data.contentId }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        if (result2 && result2.length > 0) {
            [err, result3] = await to(eventContentActionModel.query()
                .update({ active: 0 })
                .where({ "userId": data.userId })
                .where({ "contentId": data.contentId }));
            if (err) {
                throw ErrorResponse(err.message)
            }
            if (result3 && result3 != undefined) {
                try {
                    let result5;
                    [err, result5] = await to(eventContentActionModel.query().insert(payload));
                    if (err) {
                        throw ErrorResponse(err.message)
                    }
                    return result5
                } catch (err) {
                    throw ErrorResponse(err.message)
                }
            }
        } else {
            try {
                let result4;
                [err, result4] = await to(eventContentActionModel.query().insert(payload));
                if (err) {
                    throw ErrorResponse(err.message)
                }
                return result4
            } catch (err) {
                throw ErrorResponse(err.message)
            }
        }
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}


const eventContentRating = async (data) => {
    try {
        let result, err;
        [err, result] = await to(eventContentModel.query()
            .select("contentId", "rating", "userCount")
            .withGraphFetched('[rating_list]')
            .modifyGraph("rating_list", (builder) => builder.select("rating")
                .where({ "active": 1 })
                .where({ "userId": data.userId })
                .where({ "contentId": data.contentId }))
            .where({ "contentId": data.contentId }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        if (result && result != undefined) {
            if (result[0].rating_list.length > 0) {
                let rating = result[0].rating === null ? 0.0 : result[0].rating;
                let userCount = result[0].userCount === null ? 0 : result[0].userCount;
                let userRating = result[0].rating_list[0].rating;
                let finalValue = ((rating * userCount) + (data.rating - userRating)) / userCount;
               try {
                    let result2;
                    [err, result2] = await to(eventContentModel.query().update({ rating: finalValue })
                        .where({ "contentId": data.contentId }));
                    if (err) {
                        throw ErrorResponse(err.message)
                    }
                    if (result2 && result2 != undefined) {
                        try {
                            let result3;
                            [err, result3] = await to(eventContentRatingModel.query()
                                .update({ active: 0 })
                                .where({ "contentId": data.contentId })
                                .where({ "userId": data.userId })
                                .where({ "active": 1 }));
                            if (err) {
                                throw ErrorResponse(err.message)
                            }
                            if (result3 && result3 != undefined) {
                                try {
                                    let result4;
                                    let payload = {
                                        userId: data.userId,
                                        contentId: data.contentId,
                                        rating: data.rating,
                                        active: 1
                                    };
                                    [err, result4] = await to(eventContentRatingModel.query().insert(payload));
                                    if (err) {
                                        throw ErrorResponse(err.message)
                                    }
                                    return result4
                                } catch (err) {
                                    throw ErrorResponse(err.message)
                                }
                            }
                        } catch (err) {
                            throw ErrorResponse(err.message)
                        }
                    }
                } catch (err) {
                    throw ErrorResponse(err.message)
                }
            } else {
                let rating = result[0].rating === null ? 0.0 : result[0].rating;
                let userCount = result[0].userCount === null ? 0 : result[0].userCount;
                let finalValue = ((rating * userCount) + (data.rating)) / (userCount + 1);
                let result5;
                [err, result5] = await to(eventContentModel.query()
                    .update({
                        rating: finalValue,
                        userCount: userCount + 1
                    })
                    .where({ "contentId": data.contentId }));
                if (err) {
                    throw ErrorResponse(err.message)
                }
                if (result5 && result5 != undefined) {
                    try {
                        let result6;
                        let payload = {
                            userId: data.userId,
                            contentId: data.contentId,
                            rating: data.rating,
                            active: 1
                        };
                        [err, result6] = await to(eventContentRatingModel.query().insert(payload));
                        if (err) {
                            throw ErrorResponse(err.message)
                        }
                        return result6
                    } catch (err) {
                        throw ErrorResponse(err.message)
                    }
                }
            }
        }
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const eventContentDetails = async (userId, contentId) => {
    try {
        let err, result
        [err, result] = await to(eventContentModel.query().select("*")
            .withGraphFetched('[action,rating_list,user_details]')
            .modifyGraph('action', (builder) => builder.select("*")
                .where({ "active": 1 })
                .where({ "contentId": contentId }))
            .modifyGraph("rating_list", (builder) => builder.select("*")
                .where({ "active": 1 })
                .where({ "userId": userId })
                .where({ "contentId": contentId }))
            .modifyGraph("user_details", (builder) => builder
                .select("userId", "firstName", "profileImage"))
            .where({ "contentStatus": 1 })
            .where({ "delete": 0 })
            .where({ "contentId": contentId }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
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
    eventContentAction,
    eventContentDetails
}