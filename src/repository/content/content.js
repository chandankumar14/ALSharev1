const contentModel = require("../../models/content/content")
const contentActionModel = require("../../models/content/content_action")
const contentRatingModel = require("../../models/content/content_rating")
const followingModel = require("../../models/following/following")
const favouritesModel  = require("../../models/content/favourites")
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
const postDraftcontent = async (contentId, userId) => {
    try {
        let err, result
        [err, result] = await to(contentModel.query().update({ contentStatus: 1 })
            .where({ "contentId": contentId })
            .where({ "userId": userId }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//********* user draft content list ********* */
const userDraftContentList = async (userId) => {
    try {
        let err, result
        [err, result] = await to(contentModel.query().select("*")
            .where({ "userId": userId })
            .where({ "contentStatus": 0 })
            .where({ "delete": 0 }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
//******** user posted content list ********* */
const userPostedContentList = async (userId) => {
    try {
        let err, result
        [err, result] = await to(contentModel.query().select("*")
            .where({ "userId": userId })
            .where({ "contentStatus": 1 })
            .where({ "delete": 0 }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

// ******delete posted content **********
const deletePostedContent = async (contentId, userId) => {
    try {
        let err, result
        [err, result] = await to(contentModel.query().update({ delete: 1 })
            .where({ "contentId": contentId })
            .where({ "userId": userId }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

// ********All posted content list ***********
const postedContentList = async (userId) => {
    try {
        let err, result, result1
        [err, result] = await to(contentModel.query().select("*")
            .withGraphFetched('[action,rating_list,user_details,favourites]')
            .modifyGraph('action', (builder) => builder.select("*")
                .where({ "active": 1 }))
            .modifyGraph("rating_list", (builder) => builder.select("*")
                .where({ "active": 1 }))
            .modifyGraph("user_details", (builder) => builder
                .select("userId", "firstName", "lastName", "middleName", "email", "profileImage"))
            .modifyGraph("favourites", (builder) => builder.select("*")
                .where({ "userId": userId })
                .where({ "status": 1 }))
            .where({ "contentStatus": 1 })
            .where({ "delete": 0 })
            .orderBy("contentId", "DESC"))
        if (err) {
            throw ErrorResponse(err.message)
        }
        if (result && result != undefined) {
            try {
                [err, result1] = await to(followingModel.query().select("*")
                    .where({ "userId": userId })
                    .where({ "status": 1 }));

                if (result1 && result1 != undefined) {
                   result.map(item1 => {
                        if (result1.filter(item2 => item2?.followingId === item1?.user_details?.userId).length > 0) {
                           item1.following =1;
                        }
                    })
                }
               return result
            } catch (err) {
                throw ErrorResponse(err.message)
            }
        }
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

//**********Rating functionality is here ********** */
const contentRating = async (data) => {
    try {
        let err, result2, result3, result4, finalValue
        const payload = {
            contentId: data.contentId,
            rating: data.current,
            userId: data.userId,
            active: 1
        }
        finalValue = Number(parseFloat(((data.rating * data.userCount) + (data.current - data.last)) / data.userCount).toFixed(2))
        // ***********event content rating seaction *********
        const result1 = await to(contentModel.query()
            .update({ rating: finalValue, userCount: data.userCount })
            .where({ "contentId": data.contentId }));
        if (result1 && result1 != undefined) {
            try {
                if (data.firstTime) {
                    try {
                        [err, result2] = await to(contentRatingModel.query().insert(payload));
                        if (err) {
                            throw ErrorResponse(err.message)
                        }
                        return result2
                    } catch (err) {
                        throw ErrorResponse(err.message)
                    }
                } else {
                    [err, result3] = await to(contentRatingModel.query()
                        .update({ active: 0 })
                        .where({ "actionId": data.actionId }));
                    if (err) {
                        throw ErrorResponse(err.message)
                    }
                    if (result3 && result3 != undefined) {
                        try {
                            [err, result4] = await to(contentRatingModel.query().insert(payload));
                            if (err) {
                                throw ErrorResponse(err.message)
                            }
                            return result4
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
//**********Action functionality is here *************like reacting */
const contentAction = async (data) => {
    try {
        let err, result2, result3
        const payload = {
            userId: data.userId,
            contentId: data.contentId,
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
            try {
                [err, result2] = await to(contentActionModel.query()
                    .update({ active: 0 })
                    .where({ "actionId": data.actionId }));
                if (err) {
                    throw ErrorResponse(err.message)
                }
                if (result2 && result2 != undefined) {
                    try {
                        [err, result3] = await to(contentActionModel.query().insert(payload))
                        if (err) {
                            throw ErrorResponse(err.message)
                        }
                        return result3
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
}

const markAsFavourites = async (data) => {
    let err, result
    try {
        [err, result] = await to(favouritesModel.query().insert(data));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const userFavouritesContentList = async (userId) => {
    let err, result
    try {
        [err, result] = await to(favouritesModel.query().select("*")
            .withGraphFetched('[content_details,content_owner,content_action_list,content_rating_list]')
            .modifyGraph("content_details", (builder) =>
                builder.select("*").where({ "delete": 0 }))
            .modifyGraph("content_owner", (builder) => builder
                .select("userId", "firstName", "lastName", "middleName", "email"))
            .modifyGraph("content_action_list", (builder) =>
                builder.select("*").where({ "active": 1 }))
            .modifyGraph("content_rating_list", (builder) =>
                builder.select("*").where({ "active": 1 }))
            .where({ "userId": userId })
            .where({ "status": 1 }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}
const removeFavouritesContent = async (userId, contentId) => {
    try {
        let err, result;
        [err, result] = await to(favouritesModel.query().update({ status: 0 })
            .where({ "userId": userId })
            .where({ "contentId": contentId }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        return result
    } catch (err) {
        throw ErrorResponse(err.message)
    }
}

const contentDetails = async (userId, contentId) => {
    try {
        let err, result
        [err, result] = await to(contentModel.query().select("*")
            .withGraphFetched('[action,rating_list,user_details,favourites]')
            .modifyGraph('action', (builder) => builder.select("*")
                .where({ "active": 1 })
                .where({ "contentId": contentId }))
            .modifyGraph("rating_list", (builder) => builder.select("*")
                .where({ "active": 1 })
                .where({ "contentId": contentId }))
            .modifyGraph("user_details", (builder) => builder
                .select("userId", "firstName", "lastName", "middleName", "email", "profileImage"))
            .modifyGraph("favourites", (builder) => builder.select("*")
                .where({ "userId": userId })
                .where({ "contentId": contentId })
                .where({ "status": 1 }))
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
    postContent,
    postDraftcontent,
    userDraftContentList,
    userPostedContentList,
    deletePostedContent,
    postedContentList,
    contentAction,
    contentRating,
    markAsFavourites,
    userFavouritesContentList,
    removeFavouritesContent,
    contentDetails
}