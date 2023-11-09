const contentModel = require("../../models/content/content")
const contentActionModel = require("../../models/content/content_action")
const contentRatingModel = require("../../models/content/content_rating")

//**********posting new content ***** */
const postContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentModel.query().insert(data));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//*************posting draft content ********** */
const postDraftcontent = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentModel.query().update({ contentStatus: true })
            .where({ "userId": data.userId })
            .where({ "contentId": data.contentId }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//********* user draft content list ********* */
const userDraftContentList = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentModel.query().select("*")
            .where({ "userId": data.userId })
            .where({ "contentStatus": false })
            .where({ "delete": false }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//******** user posted content list ********* */
const userPostedContentList = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentModel.query().select("*")
            .where({ "userId": data.userId })
            .where({ "contentStatus": true })
            .where({ "delete": false }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

// ******delete posted content **********
const deletePostedContent = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentModel.query().update({ delete: false })
            .where({ "userId": data.userId })
            .where({ "contentId": data.contentId }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

// ********All posted content list ***********
const postedContentList = async (data) => {
    try {
        let err, result
        [err, result] = await to(contentModel.query().select("*")
            .eager('[action,rating,user_details]')
            .modifyEager('action', (builder) => builder.select("*")
                .where({ "active": true }))
            .modifyEager("rating", (builder) => builder.select("*")
                .where({ "active": true }))
            .modifyEager("user_details", (builder) => builder.select("userId", "firstName", "lastName", "middleName", "email"))
            .where({ "contentStatus": true })
            .where({ "delete": false }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

//**********Rating functionality is here ********** */
const contentRating = async (data) => {
    try {
        let err, result1, result2, result3
        const payload = {
            contentId: data.contentId,
            rating: data.current,
            userId: data.userId,
            active: true
        }
        const finalValue = Number(parseFloat(((data.rating * data.userCount) + (last - current)) / data.userCount).toFixed(2))
        // ***********event content rating seaction *********
        [err, result1] = await to(contentModel.query().update({ rating: finalValue, userCount: userCount })
            .where({ "contentId": data.contentId }))
        if (err) {
            throw ErrorResponse(err.message)
        }
        if (data.firstTime) {
            [err, result2] = await to(contentRatingModel.query().insert(payload))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result2
        } else {
            [err, result2] = await to(contentRatingModel.query().update({ active: false }).where({ "actionId": data.actionId }))
            if (err) {
                throw ErrorResponse(err.message)
            }

            [err, result3] = await to(await to(contentRatingModel.query().insert(payload)))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result3
        }


    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//**********Action functionality is here *************like reacting */
const contentAction = async (data) => {
    try {
        let err, result2, result3
        const payload = {
            userId: data.contentId,
            contentId: data.current,
            typeId: data.typeId,
            name: data.name,
            value: data.value,
        }
        if (data.firstTime) {
            [err, result2] = await to(contentActionModel.query().insert(payload))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result2
        } else {
            [err, result2] = await to(contentActionModel.query().update({ active: false }).where({ "actionId": data.actionId }))
            if (err) {
                throw ErrorResponse(err.message)
            }

            [err, result3] = await to(await to(contentActionModel.query().insert(payload)))
            if (err) {
                throw ErrorResponse(err.message)
            }
            return result3
        }

    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

module.exports = {
    postContent,
    postDraftcontent,
    userDraftContentList,
    userPostedContentList,
    deletePostedContent,
    postedContentList,
    contentAction,
    contentRating
}