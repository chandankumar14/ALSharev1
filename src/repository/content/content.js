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
const postedContentList = async (userId,pageNo) => {
    try {
        let err, result, result1
        [err, result] = await to(contentModel.query()
            .select("contentId","originalSourcePath","thumbnail","duration","rating","following","contentStatus","created_at")
            .withGraphFetched('[user_details,favourites]')
            // .modifyGraph('action', (builder) => builder.select("*")
            //     .where({ "active": 1 }))
            // .modifyGraph("rating_list", (builder) => builder.select("*")
            //     .where({ "active": 1 }))
            .modifyGraph("user_details", (builder) => builder
                .select("userId", "firstName", "profileImage"))
            .modifyGraph("favourites", (builder) => builder.select("userId","contentId")
                .where({ "userId": userId })
                .where({ "status": 1 }))
            .where({ "contentStatus": 1 })
            .where({ "delete": 0 })
            .limit(pageNo*10)
            .orderBy("rating", "DESC"))
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
        };
        [err, result2] = await to(contentActionModel
            .query().select("contentId", "userId")
            .where({ "active": 1 })
            .where({ "userId": data.userId })
            .where({ "contentId": data.contentId }));
        if (err) {
            throw ErrorResponse(err.message)
        }
        if (result2 && result2.length > 0) {
            [err, result3] = await to(contentActionModel.query()
                .update({ active: 0 })
                .where({ "userId": data.userId })
                .where({ "contentId": data.contentId }));
            if (err) {
                throw ErrorResponse(err.message)
            }
            if (result3 && result3 != undefined) {
                try {
                    let result5;
                    [err, result5] = await to(contentActionModel.query().insert(payload));
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
                [err, result4] = await to(contentActionModel.query().insert(payload));
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
                // .count("typeId")
                // .groupBy("typeId")
                .where({ "active": 1 })
                .where({ "contentId": contentId }))
            .modifyGraph("rating_list", (builder) => builder.select("*")
                .where({ "active": 1 })
                .where({ "userId": userId })
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

const contentRating = async (data) => {
    try {
        let result, err;
        [err, result] = await to(contentModel.query()
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
                console.log(finalValue)
                try {
                    let result2;
                    [err, result2] = await to(contentModel.query().update({ rating: finalValue })
                        .where({ "contentId": data.contentId }));
                    if (err) {
                        throw ErrorResponse(err.message)
                    }
                    if (result2 && result2 != undefined) {
                        try {
                            let result3;
                            [err, result3] = await to(contentRatingModel.query()
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
                                    [err, result4] = await to(contentRatingModel.query().insert(payload));
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
                [err, result5] = await to(contentModel.query()
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
                        [err, result6] = await to(contentRatingModel.query().insert(payload));
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
    contentDetails,
   
}